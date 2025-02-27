/**@jsxImportSource @emotion/react */
import * as s from './style';
import { basicButton, emptyButton } from '../../../styles/buttons';
import { FiChevronsLeft } from "react-icons/fi";
import { useRecoilState } from 'recoil';
import { mainSidebarIsOpenState } from '../../../atoms/mainSidebar/mainSidebarAtom';
import { LuLockKeyhole } from "react-icons/lu";
import { useUserMeQuery } from '../../../queries/userQuery';
import { useNavigate } from 'react-router-dom';
import { BiLogOut } from 'react-icons/bi';
import { useQueryClient } from '@tanstack/react-query';


function MainSidebar(props) {
    const navigate = useNavigate();
    const [ isOpen, setOpen ] = useRecoilState(mainSidebarIsOpenState);
    const queryClient = useQueryClient();
    const loginUserData = queryClient.getQueryData(["userMeQuery"]);

    const handleSidebarClose = () => {
        setOpen(false);
    }

    const handleAccountButtonOnClick = () => {
        navigate("/account/setting");
    }

    const handleLogoutButtonOnClick = async () => {
        setTokenLocalStroage("AccessToken", null);
        queryClient.removeQueries({queryKey: ["userMeQuery"]})
        navigate("/auth/login");
    }

    return (
        <div css={s.layout(isOpen)}>
            <div css={s.container}>
                <div>
                    <div css={s.groupLayout}>
                        <div css={s.topGroup}>
                            <div css={s.user}>
                                <button css={emptyButton} onClick={handleAccountButtonOnClick}>
                                    <span css={s.authText}>
                                        <div css={s.profileImgBox}>
                                        {
                                            loginUser.isLoading ||
                                            <img src={`http://localhost:8080/image/user/profile/${loginUserData?.data.profileImg}`} alt="" />
                                        }
                                        </div>
                                        {loginUserData?.data.nickname}
                                    </span>
                                </button>
                            </div>
                            <button css={basicButton} onClick={handleSidebarClose}><FiChevronsLeft /></button>
                        </div>
                    </div>
                </div>
                <div>
                    <div css={s.groupLayout}>
                        <button css={emptyButton}>
                            <span css={s.authText} onClick={handleLogoutButtonOnClick}>
                                <BiLogOut /> 로그아웃
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainSidebar;