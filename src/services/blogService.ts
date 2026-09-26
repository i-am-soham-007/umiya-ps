import { BLOG_POSTS, TEAM_MEMBERS } from '../data/mockData';
import { BlogPost, TeamMember } from '../types';

export class BlogService {
  /**
   * GET /api/blogs
   */
  static async getBlogs(): Promise<BlogPost[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(BLOG_POSTS);
      }, 100);
    });
  }
}

export class TeamService {
  /**
   * GET /api/team
   */
  static async getTeam(): Promise<TeamMember[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(TEAM_MEMBERS);
      }, 100);
    });
  }
}
