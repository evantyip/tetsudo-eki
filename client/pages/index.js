import { useState, useEffect } from 'react';
import axios from 'axios';
import CustomFooter from '../components/footer';
import AnimeCard from '../components/anime-card';

import { Layout, Select, Space } from 'antd';
const { Header, Content } = Layout;
const { Option } = Select;

const DiscoverPage = ({ currentUser, currentSeason }) => {
  const [season, setSeason] = useState(currentSeason);
  const [years, setYears] = useState([]);

  const handleSeasonChange = async (value) => {
    if (
      value === 'winter' ||
      value === 'spring' ||
      value === 'summer' ||
      value === 'fall'
    ) {
      const { data } = await axios.get(
        `/api/discover/season/${value}/${season.season_year}`
      );
      setSeason(data);
    } else {
      const { data } = await axios.get(
        `/api/discover/season/${season.season_name}/${value}`
      );
      setSeason(data);
    }
  };

  useEffect(() => {
    getYearOptions();
  }, []);

  const getYearOptions = () => {
    // make an array of past 20 years
    // eventually will be mapped for year options
    let yearArray = [];
    const d = new Date();
    for (let i = 0; i < 20; i++) {
      yearArray.push(parseInt(d.getFullYear()) - i);
    }
    setYears(yearArray);
  };

  // TODO
  // Better Spacing
  // Align div better
  // Create header
  return (
    <Layout className="site-layout" style={{ marginLeft: 200 }}>
      <Header className="site-layout-background" style={{ padding: 0 }}>
        Discover
      </Header>
      <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
        <div
          className="site-layout-background"
          style={{ padding: 24, textAlign: 'center' }}
        >
          <Select
            defaultValue={season.season_name}
            onChange={handleSeasonChange}
            style={{ width: 120 }}
          >
            <Option value="winter">Winter</Option>
            <Option value="spring">Spring</Option>
            <Option value="summer">Summer</Option>
            <Option value="fall">Fall</Option>
          </Select>
          <Select
            defaultValue={season.season_year}
            onChange={handleSeasonChange}
            style={{ width: 120 }}
          >
            {years.map((year) => {
              return <Option value={year}>{year}</Option>;
            })}
          </Select>
        </div>
        <Space align="start" size="large" wrap>
          {season.anime &&
            season.anime.map((ani) => {
              return <AnimeCard key={ani.title} anime={ani} />;
            })}
        </Space>
      </Content>
      <CustomFooter />
    </Layout>
  );
};

DiscoverPage.getInitialProps = async (context, client, currentUser) => {
  try {
    const { data } = await client.get(`/api/discover/season`);
    return { currentSeason: data };
  } catch (e) {
    console.log(e.message);
    return { currentSeason: {} };
  }
};

export default DiscoverPage;
