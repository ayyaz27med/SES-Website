import { useQuery } from "@tanstack/react-query";
import { queryKeys } from ".";
import { fetchHomePagePopupDetails } from "@/services/menu";

const useHomePagePopupDetails = () => {
  return useQuery({
    queryKey: [queryKeys.homePagePopupDetails],
    queryFn: () => fetchHomePagePopupDetails(),
  });
};

export default useHomePagePopupDetails;
