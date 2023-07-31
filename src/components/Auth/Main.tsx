import React, {useEffect} from 'react';
import {authMeTC, logoutTC, UserType} from "../../state/auth-reducer";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from 'react-router-dom';
import {AppRootStateType} from "../../state/store";
import {packsApi} from "../../api/api";
import PacksList from "./packsList/PacksList";
import {getCardPacksTC, packsReducer} from "../../state/packs-reducer";
import {CardsPacksType, ResponseCardsPackType} from "../../types/types";
import Settings from "../settings/Settings";
import RangeSlider from "../slider/Slider";
import {Pagination} from "../Pagination/Pagination";


export const Main = () => {
    const isAuth = useSelector<AppRootStateType, boolean>(state => state.auth.isAuth)
    const user = useSelector<AppRootStateType, UserType>(state => state.auth.user)
    const packs = useSelector<AppRootStateType, CardsPacksType[]>(state => state.packsReducer.cardsPacks)
    const page = useSelector<AppRootStateType, number>(state => state.packSearchReducer.page)

    const navigate = useNavigate()
    const dispatch = useDispatch<any>()

    useEffect(() => {
        if (!isAuth) {
            dispatch(authMeTC(navigate))
        }
    }, [])

    useEffect(() => {
        if (isAuth) {
            dispatch(getCardPacksTC())
        }
    }, [isAuth,page])

    const logout = () => {
        dispatch(logoutTC(navigate))
    }

    console.log(packs)
    return (
        <div>
            <div>
                {user.name}
            </div>
            <div>
                <button onClick={logout}>
                    logout
                </button>
            </div>
            <div>
                {/*<RangeSlider/>*/}
                <PacksList packs={packs} userId={user._id}/>
                <Pagination/>
            </div>
        </div>
    );
};

