import { create } from 'zustand';
import { Issue, Status } from '../types';
import { issueService } from '../services/issues';

interface IssueStore {
  issues: Issue[];
  loading: boolean;
  error: string | null;
  fetchIssues: () => Promise<void>;
  addIssue: (issue: Omit<Issue, 'id' | 'reporterId' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateIssueStatus: (id: string, status: Status) => Promise<void>;
  assignIssue: (id: string, userId: string) => Promise<void>;
}

export const useIssueStore = create<IssueStore>((set, get) => ({
  issues: [],
  loading: false,
  error: null,

  fetchIssues: async () => {
    try {
      set({ loading: true, error: null });
      const issues = await issueService.getAllIssues();
      set({ issues, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch issues', loading: false });
    }
  },

  addIssue: async (issueData) => {
    try {
      set({ loading: true, error: null });
      const newIssue = await issueService.createIssue(issueData);
      set((state) => ({
        issues: [...state.issues, newIssue],
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to create issue', loading: false });
    }
  },

  updateIssueStatus: async (id, status) => {
    try {
      set({ loading: true, error: null });
      const updatedIssue = await issueService.updateIssueStatus(id, status);
      set((state) => ({
        issues: state.issues.map((issue) =>
          issue.id === id ? updatedIssue : issue
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to update issue status', loading: false });
    }
  },

  assignIssue: async (id, userId) => {
    try {
      set({ loading: true, error: null });
      const updatedIssue = await issueService.assignIssue(id, userId);
      set((state) => ({
        issues: state.issues.map((issue) =>
          issue.id === id ? updatedIssue : issue
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to assign issue', loading: false });
    }
  },
}));