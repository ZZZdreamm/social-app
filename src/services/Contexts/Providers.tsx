import { QueryClient, QueryClientProvider } from "react-query";
import { AuthenticationDataProvider } from "./AuthenticationContext";
import { ProfileDataProvider } from "./ProfileDataContext";
import { OpenedChatsProvider } from "./OpenedChatsContext";
import ThemeProvider from "../../globals/ThemeProvider";
import { queryClient } from "../../globals/constants";


interface Props {
  children: React.ReactNode;
}

export function Providers({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthenticationDataProvider>
        <ProfileDataProvider>
          <OpenedChatsProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </OpenedChatsProvider>
        </ProfileDataProvider>
      </AuthenticationDataProvider>
    </QueryClientProvider>
  );
}
