/*************************************
 ***  Made By Yohay Hackam         ***
 ***  mail: Yoman_321@hotmail.com  ***
 ***  054-2616626                  ***
 *************************************/

import React,{ useContext } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { MyContext, EVENTS_TITLES } from "./services/MyProvider"
import { Notifications } from 'react-push-notification';
import { Wrapper } from "@googlemaps/react-wrapper";
import background from './assets/img/background.jfif'
import Loading from "./components/Loading/Loading";
import NotFound from "./components/NotFound/NotFound";
import GetUpdated from "./services/GetUpdated"
import ReverseWarning from './components/ReverseWarning/ReverseWarning';

import Header from "./components/Header/Header"
import Login from './pages/auth/Login'
import Forgot from './pages/auth/Forgot';
import MainScreen from './pages/MainScreen/MainScreen'
import Customers from './pages/Customers/Customers'
import Profiles from './pages/Profiles/Profiles'
import Users from "./pages/Users/Users"
import ViewParameters from "./pages/Parameters/ViewParameters"
import RefreshJwtToken from "./services/RefreshJwtToken"
import Hydrants from './pages/Hydrants/Hydrants'
import Events from './pages/Events/Events'
import EventHandling from "./pages/EventHandling/EventHandling";
import FilteredTablePage from "./pages/Events/FilteredTablePage"
import Statistics from "./pages/Statistics/Statistics";


export default function App() {

    const { REACT_APP_MAP_TOKEN } = process.env
    const { userInfo, isLoading, isReversFlow, isMuted } = useContext(MyContext);


    return (

        <BrowserRouter>
            <Notifications />
            <div className="App" dir="rtl" style={(userInfo) ? { background: 'var(--white)' } : { background: `url(${background}) no-repeat `, backgroundSize: 'cover' }}>
                {isReversFlow && (!isMuted) && <ReverseWarning event={isReversFlow} />}
                <Header />
                {isLoading && <Loading />}
                <Wrapper apiKey={REACT_APP_MAP_TOKEN} language={"iw"} >
                    <Routes>

                        <Route path="/" element={(userInfo) ?

                            userInfo?.ui_access_list?.main ? <MainScreen />
                                : userInfo?.ui_access_list?.handling ? <EventHandling />
                                    : <Events /> : <></>} />

                        <Route path="/login" element={<Login />} />
                        <Route path="/forgot" element={<Forgot />} />

                        {(userInfo) &&
                         <>

                                <Route path="/handling" element={userInfo?.ui_access_list?.handling ? <EventHandling /> : <NotFound />} />

                                <Route path="/events" element={userInfo?.ui_access_list?.events ? <Events /> : <NotFound />} />
                                <Route path="/flow" element={userInfo?.ui_access_list?.events ? <FilteredTablePage title={EVENTS_TITLES.trig1} trigger={1} /> : <NotFound />} />
                                <Route path="/reverse" element={userInfo?.ui_access_list?.events ? <FilteredTablePage title={EVENTS_TITLES.trig2} trigger={2} /> : <NotFound />} />
                                <Route path="/vandalisem" element={userInfo?.ui_access_list?.events ? <FilteredTablePage title={EVENTS_TITLES.trig3} trigger={3} /> : <NotFound />} />
                                <Route path="/battery" element={userInfo?.ui_access_list?.events ? <FilteredTablePage title={EVENTS_TITLES.trig5} trigger={5} /> : <NotFound />} />
                                <Route path="/lifeSignal" element={userInfo?.ui_access_list?.events ? <FilteredTablePage title={EVENTS_TITLES.trig6} trigger={6} /> : <NotFound />} />
                                <Route path="/pressure" element={userInfo?.ui_access_list?.events ? <FilteredTablePage title={EVENTS_TITLES.trig7} trigger={7} /> : <NotFound />} />
                                <Route path="/statistics" element={userInfo?.ui_access_list?.statistic ? <Statistics /> : <NotFound />} />

                                <Route path="/Customers/*" element={userInfo?.mng_access_list?.customersAccess ? <Customers /> : <NotFound />} />
                                <Route path="/profiles/*" element={userInfo?.mng_access_list?.profilesAccess ? <Profiles /> : <NotFound />} />
                                <Route path="/users/*" element={userInfo?.mng_access_list?.usersAccess ? <Users /> : <NotFound />} />
                                <Route path="/parameters/*" element={userInfo?.mng_access_list?.parametersAccess ? <ViewParameters /> : <NotFound />} />
                                <Route path="/hydrants" element={userInfo?.mng_access_list?.hydrantsAccess ? <Hydrants /> : <NotFound />} />
                                <Route path="*" element={<NotFound />} />
                            </>
                        }
                    </Routes>
                </Wrapper>
            </div>
            {(userInfo) && <GetUpdated />}
            <RefreshJwtToken />
        </BrowserRouter>
    )
}
