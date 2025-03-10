import { useQuery } from "@tanstack/react-query";

import { getMyStories as getMyStoriesAPI } from "../services/apiGetMyStories";

function useMyStroies() {
  const {
    data: myStories,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["my-stories"],
    queryFn: getMyStoriesAPI,
  });
  return { myStories, error, isLoading };
}

export { useMyStroies };
