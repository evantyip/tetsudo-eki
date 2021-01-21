import { useState, useEffect } from 'react';
import axios from 'axios';
import CustomFooter from '../components/footer';
import AnimeCard from '../components/anime-card';

import { Layout, Select, Space, Spin } from 'antd';
const { Header, Content } = Layout;
const { Option } = Select;

import { AppContextType } from 'next/dist/next-server/lib/utils';
import { CurrentUser } from '../interfaces/currentUser';
import { Season } from '../interfaces/anime';
import useRequest from '../hooks/use-request';

type AppProps = {
  currentUser: CurrentUser;
  currentSeason: Season;
  years: number[];
};

// Discover Page React Component

const filterAnime = (data: Season): Season => {
  const filteredAnime = data.anime.slice(0, 20);
  return {
    season_name: data.season_name,
    season_year: data.season_year,
    anime: filteredAnime,
  };
};
const DiscoverPage = ({ currentUser, currentSeason, years }: AppProps) => {
  const [season, setSeason] = useState(currentSeason);
  const [loading, setLoading] = useState(false);

  const { errors, doRequest } = useRequest({
    url: null,
    method: 'get',
    body: {},
    onSuccess: (data) => {
      // const filtered = filterAnime(data);
      setSeason(data);
      setLoading(false);
    },
  });
  const handleSeasonChange = async (value: string) => {
    if (
      value === 'winter' ||
      value === 'spring' ||
      value === 'summer' ||
      value === 'fall'
    ) {
      setLoading(true);
      doRequest(`/api/discover/season/${value}/${season.season_year}`);
    } else {
      setLoading(true);
      doRequest(`/api/discover/season/${season.season_name}/${value}`);
    }
  };

  useEffect(() => {
    getYearOptions();
  }, []);

  const getYearOptions = () => {
    // make an array of past 20 years
    // eventually will be mapped for year options
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
            <Option key="0" value="winter">
              Winter
            </Option>
            <Option key="1" value="spring">
              Spring
            </Option>
            <Option key="2" value="summer">
              Summer
            </Option>
            <Option key="3" value="fall">
              Fall
            </Option>
          </Select>
          <Select
            defaultValue={season.season_year.toString()}
            onChange={handleSeasonChange}
            style={{ width: 120 }}
          >
            {years.map((year) => {
              return (
                <Option key={year} value={year}>
                  {year}
                </Option>
              );
            })}
          </Select>
        </div>
        <div className="">
          <Space align="start" size="large" wrap>
            {errors}
            {loading && !errors && <Spin size="large" />}
            {!loading &&
              season.anime &&
              season.anime.map((ani) => {
                if (ani.type == 'TV') {
                  return (
                    <AnimeCard key={ani.title} badgeStatus={null} anime={ani} />
                  );
                }
                return;
              })}
          </Space>
        </div>
      </Content>
      <CustomFooter />
    </Layout>
  );
};

DiscoverPage.getInitialProps = async (
  context: AppContextType,
  client: any,
  currentUser: CurrentUser
) => {
  let yearArray = [];
  const d = new Date();
  for (let i = 0; i < 20; i++) {
    yearArray.push(d.getFullYear() - i);
  }
  console.log('ON THE SERVER');
  try {
    const { data } = await client.get(`/api/discover/season`);
    // Dev purpose
    return { currentSeason: data, years: yearArray };
  } catch (e) {
    console.log(e.message);
    return { currentSeason: {}, years: yearArray };
  }
};

export default DiscoverPage;
