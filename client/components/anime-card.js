import { Card } from 'antd';
import { useState } from 'react';

const { Meta } = Card;

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
        <img alt={anime.title} src={anime.image_url}></img>
        <Meta title={anime.title} description={anime.synopsis} />
      </div>
    ),
    Details: <p>Details page</p>,
  };

  return (
    <Card
      style={{ width: 250 }}
      // cover={<img alt={anime.title} src={anime.image_url}></img>}
      tabList={tabList}
      activeTabKey={key}
      onTabChange={(key) => {
        setKey(key);
      }}
    >
      {contentList[key]}
    </Card>
  );
};

export default AnimeCard;
