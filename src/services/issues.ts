import api from './api';
import type { Issue } from '../types/index';

export const issueService = {
  async getAllIssues(): Promise<Issue[]> {
    const response = await api.get<Issue[]>('/issues');
    return response.data;
  },

  async createIssue(issueData: Omit<Issue, 'id' | 'reporterId' | 'createdAt' | 'updatedAt'>): Promise<Issue> {
    const response = await api.post<Issue>('/issues', issueData);
    return response.data;
  },

  async updateIssueStatus(id: string, status: Issue['status']): Promise<Issue> {
    const response = await api.patch<Issue>(`/issues/${id}/status`, { status });
    return response.data;
  },

  async assignIssue(id: string, userId: string): Promise<Issue> {
    const response = await api.patch<Issue>(`/issues/${id}/assign`, { userId });
    return response.data;
  },
};