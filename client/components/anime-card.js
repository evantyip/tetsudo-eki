import { Card, Image, Layout, Typography, Space, Tag, Divider } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { useState } from 'react';

const { Meta } = Card;
const { Conent } = Layout;
const { Title, Text } = Typography;

// Todo
// Better Card Design
// Card size lock
const AnimeCard = ({ anime }) => {
  const [key, setKey] = useState('Overview');
  const tabList = [
    {
      key: 'Overview',
      tab: 'Overview',
    },
    {
      key: 'Details',
      tab: 'Details',
    },
  ];

  const contentList = {
    Overview: (
      <div>
        <Image preview={false} width={200} src={anime.image_url} />
        <Title level={5}>{anime.title}</Title>
        <Divider />
        <Space direction="vertical">
          <Space direction="horizontal">
            <Text strong>Score: </Text>
            <Text>{anime.score}</Text>
          </Space>
          <Space direction="horizontal">
            <Text strong>Episdoes: </Text>
            <Text>{anime.episodes}</Text>
          </Space>
          <Text strong>Genres:</Text>
          <Space wrap direction="horizontal">
            {anime.genres.map((gnere) => {
              return (
                <Tag key={`${anime.title + gnere.name}`} color="#108ee9">
                  {gnere.name}
                </Tag>
              );
            })}
          </Space>
        </Space>
      </div>
    ),
    Details: (
      <Space direction="vertical">
        <Space direction="horizontal">
          <Text strong>Source:</Text>
          <Text>{anime.source}</Text>
        </Space>
        <Space direction="horizontal">
          <Text strong>Airing Start:</Text>
          <Text>{new Date(`${anime.airing_start}`).toDateString()}</Text>
        </Space>
        <Space direction="horizontal">
          <Text strong>Producers:</Text>
          <Text>{anime.producers[0] && anime.producers[0].name}</Text>
        </Space>
        <Text strong>Synposis</Text>
        <div style={{ height: 350, overflow: 'scroll' }}>
          <Text>{anime.synopsis}</Text>
        </div>
      </Space>
    ),
  };

  return (
    <Card
      style={{ width: 250, height: 'flex' }}
      key={`${anime.title + anime.airing_start}`}
      tabList={tabList}
      activeTabKey={key}
      onTabChange={(key) => {
        setKey(key);
      }}
      extra={<a href={anime.url}>MAL</a>}
    >
      {contentList[key]}
    </Card>
  );
};

export default AnimeCard;
