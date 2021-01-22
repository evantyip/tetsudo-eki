import { useState, useEffect } from 'react';
import axios from 'axios';
import CustomFooter from '../components/footer';
import AnimeCard from '../components/anime-card';

import { Layout, Select, Space, Spin } from 'antd';
const { Header, Content } = Layout;
const { Option } = Select;

import { AppContextType } from 'next/dist/next-server/lib/utils';
import { CurrentUser } from '../interfaces/currentUser';
import { Anime, Season } from '../interfaces/anime';
import useRequest from '../hooks/use-request';

type AppProps = {
  currentUser: CurrentUser;
  currentSeason: Season;
  years: number[];
  userWatchingAnimeMap: any;
  userCompletedAnimeMap: any;
};

// Discover Page React Component

const DiscoverPage = ({
  currentUser,
  userWatchingAnimeMap,
  userCompletedAnimeMap,
  currentSeason,
  years,
}: AppProps) => {
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
                let badgeStatus: string | null = null;
                if (userWatchingAnimeMap.hasOwnProperty(ani.title)) {
                  badgeStatus = 'Watching';
                }
                if (userCompletedAnimeMap.hasOwnProperty(ani.title)) {
                  badgeStatus = 'Completed';
                }

                if (ani.type == 'TV') {
                  return (
                    <AnimeCard
                      currentUser={currentUser}
                      key={ani.title}
                      badgeStatus={badgeStatus}
                      anime={ani}
                    />
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

// Retrieve inital data
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
    let watchingAnime;
    let completedAnime;
    if (currentUser) {
      const request = await client.get(`/api/watching/${currentUser.id}`);
      watchingAnime = request.data;
      const { data } = await client.get(`/api/completed/${currentUser.id}`);
      completedAnime = data;
    }

    // Dev purpose
    return {
      currentSeason: data,
      userWatchingAnimeMap: watchingAnime.UserWatchingAnimeMap,
      userCompletedAnimeMap: completedAnime.UserCompletedAnimeMap,
      years: yearArray,
    };
  } catch (e) {
    console.log(e.message);
    return {
      currentSeason: { season_name: 'winter', season_year: '2021', anime: [] },
      years: yearArray,
      userWatchingAnimeMap: {},
      userCompletedAnimeMap: {},
    };
  }
};

export default DiscoverPage;
