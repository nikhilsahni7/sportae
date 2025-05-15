export const API_BASE_URL = "https://scoring.ezly.site/v1";

export const ENDPOINTS = {
  // Authentication
  SIGNUP: `${API_BASE_URL}/users/signup`,
  LOGIN: `${API_BASE_URL}/users/login`,
  EDIT_PROFILE: `${API_BASE_URL}/users/editProfile`,
};

export const ROLES = {
  VIEWER: 0,
  SCORER: 1,
};

export const STATUS_CODES = {
  ON_BOARDED: 0,
  PASSWORD_SET: 1,
};
