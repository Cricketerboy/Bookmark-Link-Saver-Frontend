import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import api from '../services/api';
import { useTheme } from '../context/ThemeContext';

const Container = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 20px;
`;

const Heading = styled.h2`
  text-align: center;
  margin: 80px 0 30px;
  font-size: 2rem;
  color: ${({ theme }) => (theme.isDarkMode ? '#fff' : '#333')};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

const Card = styled.div`
  background: ${({ theme }) => (theme.isDarkMode ? '#1e1e1e' : '#fff')};
  color: ${({ theme }) => (theme.isDarkMode ? '#eee' : '#222')};
  border-radius: 12px;
  padding: 20px;
  box-shadow: ${({ theme }) =>
        theme.isDarkMode
            ? '0 0 12px rgba(255, 255, 255, 0.2)' // white shadow in dark mode
            : '0 4px 12px rgba(0, 0, 0, 0.1)'};
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Title = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0;
`;

const FaviconLink = styled.a`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: ${({ theme }) => (theme.isDarkMode ? '#bb86fc' : '#007bff')};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Favicon = styled.img`
  width: 18px;
  height: 18px;
  margin-right: 8px;
`;

const SummaryLabel = styled.h4`
  margin: 10px 0 0;
  font-size: 1rem;
  color: ${({ theme }) => (theme.isDarkMode ? '#ccc' : '#333')};
`;

const Summary = styled.div`
  font-size: 0.95rem;
  color: ${({ theme }) => (theme.isDarkMode ? '#ddd' : '#444')};
  line-height: 1.6;
  max-height: ${({ expanded }) => (expanded ? 'none' : '4.8em')};
  overflow: hidden;
  position: relative;
`;

const FadeOverlay = styled.div`
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  height: 1.5em;
  width: 100%;
  background: ${({ theme }) =>
        theme.isDarkMode ? 'linear-gradient(to top, #1e1e1e, transparent)' : 'linear-gradient(to top, white, transparent)'};
  display: ${({ show }) => (show ? 'block' : 'none')};
`;

const ReadMore = styled.span`
  color: ${({ theme }) => (theme.isDarkMode ? '#bb86fc' : '#007bff')};
  cursor: pointer;
  font-weight: 500;
  display: block;
  margin-top: 5px;
`;

const DeleteButton = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 25px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
  align-self: flex-start;

  &:hover {
    background-color: #c0392b;
  }
`;

const BookmarkList = () => {
    const [bookmarks, setBookmarks] = useState([]);
    const [expanded, setExpanded] = useState({});
    const { isDarkMode } = useTheme();

    useEffect(() => {
        const fetchBookmarks = async () => {
            try {
                const res = await api.get('/bookmarks');
                setBookmarks(res.data);
            } catch (err) {
                console.error('Failed to fetch bookmarks', err);
            }
        };

        fetchBookmarks();
    }, []);

    const handleDelete = async (id) => {
        try {
            await api.delete(`/bookmarks/${id}`);
            setBookmarks(bookmarks.filter((b) => b._id !== id));
        } catch (err) {
            console.error('Failed to delete bookmark', err);
        }
    };

    const toggleExpand = (id) => {
        setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <Container>
            <Heading theme={{ isDarkMode }}>Saved Bookmarks</Heading>
            <Grid>
                {bookmarks.map((b) => {
                    const isLong = b.summary.length > 300;
                    const isExpanded = expanded[b._id];
                    return (
                        <Card key={b._id} theme={{ isDarkMode }}>
                            <Title>{b.title}</Title>

                            <FaviconLink
                                href={b.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                theme={{ isDarkMode }}
                            >
                                <Favicon src={b.favicon} alt="favicon" />
                                {b.url}
                            </FaviconLink>

                            <SummaryLabel theme={{ isDarkMode }}>Summary:</SummaryLabel>
                            <Summary expanded={isExpanded} theme={{ isDarkMode }}>
                                {b.summary}
                                {!isExpanded && isLong && <FadeOverlay show theme={{ isDarkMode }} />}
                            </Summary>

                            {isLong && (
                                <ReadMore onClick={() => toggleExpand(b._id)} theme={{ isDarkMode }}>
                                    {isExpanded ? 'Read less' : 'Read more'}
                                </ReadMore>
                            )}

                            <DeleteButton onClick={() => handleDelete(b._id)}>
                                Delete
                            </DeleteButton>
                        </Card>
                    );
                })}
            </Grid>
        </Container>
    );
};

export default BookmarkList;
