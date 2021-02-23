import { ICatSub, ICatData } from 'pages/Discover/Playlist/typing';
import { ajaxGet } from '../ajax';
import { 
  GET_PLAYLIST_CATLIST, 
  GET_PLAYLIST_BY_CAT, 
  GET_PLAYLIST_DETAIL, 
  GET_RELATED_PLAYLIST 
} from './../url';
import { IPlayData } from '@/typings';
import { IQueryParams } from 'pages/Discover/Playlist/typing';

/**
 * 请求歌单分类数据
 */
const getCatListRequest = async () => {
  const res = await ajaxGet(GET_PLAYLIST_CATLIST);
  const { categories, sub } = res;
  const values: string[] = Object.values(categories);
  const catList: ICatData[] = values.map(item => ({ name: item, children: [] }));
  catList.forEach((item: ICatData, index: number) => {
    sub.forEach((cur: ICatSub) => {
      if (cur.category === index) {
        item.children.push(cur);
      }
    })
  })
  return catList;
}

/**
 * 请求分类歌单数据
 */
const getPlaylistRequest = async (params: IQueryParams) => {
  const res = await ajaxGet(GET_PLAYLIST_BY_CAT, params);
  return {
    ...res,
    playlists: res.playlists.map((item: IPlayData) => ({
      ...item,
      copywriter: item.creator ? item.creator.nickname : ''
    }))
  };
};

/**
 * 请求歌单详情数据
 * @param id 歌单id
 */
const getPlaylistDetailRequest = (id: number) => {
  return ajaxGet(GET_PLAYLIST_DETAIL, { id });
};

/**
 * 获取相关歌单推荐
 * @param id 歌单id
 */
const getRelatedPlaylistRequest = (id: number) => {
  return ajaxGet(GET_RELATED_PLAYLIST, { id })
}

export {
  getCatListRequest,
  getPlaylistRequest,
  getPlaylistDetailRequest,
  getRelatedPlaylistRequest
}