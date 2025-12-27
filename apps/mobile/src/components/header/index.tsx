import HeaderBack from "./header-back";
import HeaderProfile from "./header-profile";
import HeaderRoot from "./header-root";
import HeaderStatus from "./header-status";
import CompactHealthBar from "./header-status-hp";
import CompactXPBar from "./header-status-xp";
import HeaderTitle from "./header-title";
import HeaderWrapper from "./header-wrapper";

export const Header = {
    Root: HeaderRoot,
    Status: {
        Root: HeaderStatus,
        XP: CompactXPBar,
        HP: CompactHealthBar
    },
    Back: HeaderBack,
    Title: HeaderTitle,
    Wrapper: HeaderWrapper,
    Profile: HeaderProfile,
}