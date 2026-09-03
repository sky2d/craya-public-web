import { PolicyProvider } from "@/provider/PolicyProvider";
import Sidebar from "./components/Sidebar";
import UserActions from "./components/UserActions";

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <PolicyProvider>
      <div className="flex h-full w-full flex-col">
        <UserActions text="Settings" showCancelButton />
        <div className="flex h-full w-full p-2">
          <Sidebar />
          {children}
        </div>
      </div>
    </PolicyProvider>
  );
}
