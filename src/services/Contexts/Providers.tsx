import { QueryClientProvider } from "react-query";
import { AuthenticationDataProvider } from "./AuthenticationContext";
import { ProfileDataProvider } from "./ProfileDataContext";
import { OpenedChatsProvider } from "./OpenedChatsContext";
import ThemeProvider from "../../globals/ThemeProvider";
import { queryClient } from "../../globals/constants";
import { NightModeProvider } from "./NightModeContext";

interface Props {
  children: React.ReactNode;
}

export function Providers({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthenticationDataProvider>
        <ProfileDataProvider>
          <NightModeProvider>
            <OpenedChatsProvider>
              <ThemeProvider>{children}</ThemeProvider>
            </OpenedChatsProvider>
          </NightModeProvider>
        </ProfileDataProvider>
      </AuthenticationDataProvider>
    </QueryClientProvider>
  );
}
