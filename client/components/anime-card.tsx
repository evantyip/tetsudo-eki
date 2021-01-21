import { Anime } from '../interfaces/anime';
import {
  Card,
  Image,
  Layout,
  Typography,
  Space,
  Tag,
  Divider,
  Badge,
} from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';

const { Title, Text } = Typography;

type AppProps = {
  anime: Anime;
  badgeStatus: string | null;
};
// Todo
const AnimeCard = ({ anime, badgeStatus }: AppProps) => {
  // For Tab changes on Card
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

  // Watching and Completed States
  const [badge, setBadge] = useState<string | null>(badgeStatus);
  const colorChoice = new Map([
    ['Watching', 'orange'],
    ['Completed', 'green'],
  ]);
  useEffect(() => {
    console.log('badge changed');
  }, [badge]);

  const contentList: { [key: string]: React.ReactNode } = {
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

  // set color to a map of watching or completed
  return (
    <div>
      {badge && (
        <Badge.Ribbon color={colorChoice.get(badge)} text={badge}>
          <Card
            style={{ width: 250, height: 'flex' }}
            tabList={tabList}
            activeTabKey={key}
            onTabChange={(key) => {
              setKey(key);
            }}
            actions={[
              <div
                onClick={(e) => {
                  console.log(e.target);
                  if (badge === 'Watching') {
                    setBadge(null);
                  } else {
                    setBadge('Watching');
                  }
                }}
              >
                <EditOutlined key="edit" />
                <Text>Add Watching</Text>
              </div>,
              <div
                onClick={(e) => {
                  console.log(e.target);
                  if (badge === 'Completed') {
                    setBadge(null);
                  } else {
                    setBadge('Completed');
                  }
                }}
              >
                <EditOutlined key="edit" />
                <Text>Completed</Text>
              </div>,
            ]}
          >
            {contentList[key]}
          </Card>
        </Badge.Ribbon>
      )}
      {!badge && (
        <Card
          style={{ width: 250, height: 'flex' }}
          tabList={tabList}
          activeTabKey={key}
          onTabChange={(key) => {
            setKey(key);
          }}
          actions={[
            <div onClick={(e) => setBadge('Watching')}>
              <EditOutlined key="edit" />
              <Text>Add Watching</Text>
            </div>,
            <div onClick={(e) => setBadge('Completed')}>
              <EditOutlined key="edit" />
              <Text>Completed</Text>
            </div>,
          ]}
        >
          {contentList[key]}
        </Card>
      )}
    </div>
  );
};

export default AnimeCard;
