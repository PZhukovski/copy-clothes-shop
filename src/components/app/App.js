import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, location as useLocation } from 'react-router-dom';
import ScrollToTop from './ScrollToTop.js';
import PageHeader from '../pageHeader/Page-Header.js';
import Spinner from '../spinner/Spinner';

import './app.scss';
import SendForm from '../pages/registration/sendForm/SendForm.js';
import LoginForm from '../pages/login/Login-form.js';
import Profile from '../pages/profile/Profile.js';
import EditProfile from '../pages/EditProfile/EditProfile.js';
import MainPage from '../pages/MainPage/MainPage.js';
import SearchPage from '../pages/SearchPage/SearchPage.js';
import CommonListPage from '../pages/womanClothes/renderPage/CommonListPage.js';
import RenderListPage from '../pages/womanClothes/renderPage/RenderListPage.js';
import SinglePageItem from '../pages/womanClothes/SinglePageItem.js';
import WishListPage from '../pages/WishListPage/WishListPage.js';
import BasketPage from '../pages/BasketPage/BasketPage.js';
import PageFooter from '../pageFooter/PageFooter.js';

// const SendForm = lazy(() => import('../pages/registration/sendForm/SendForm'));
// const LoginForm = lazy(() => import('../pages/login/Login-form'));
// const Profile = lazy(() => import('../pages/profile/Profile'));
// const EditProfile = lazy(() => import('../pages/EditProfile/EditProfile'));
// const MainPage = lazy(() => import('../pages/MainPage/MainPage'));
// const SearchPage = lazy(() => import('../pages/SearchPage/SearchPage'));

// const CommonListPage = lazy(() => import('../pages/womanClothes/renderPage/CommonListPage'));
// const RenderListPage = lazy(() => import('../pages/womanClothes/renderPage/RenderListPage'));
// const SinglePageItem = lazy(() => import('../pages/womanClothes/SinglePageItem'));
// const WishListPage = lazy(() => import('../pages/WishListPage/WishListPage'));
// const BasketPage = lazy(() => import('../pages/BasketPage/BasketPage'));


const App = () => {

    return (
        <Router>
            <ScrollToTop>
                <main className="app"  >
                    <PageHeader />
                    {/* <Suspense fallback={<Spinner />}> */}
                        <Routes >
                            <Route path="/" element={<MainPage />}></Route>
                            <Route path="/catalog/womancollection/new" element={<CommonListPage />}></Route>
                            <Route path="/catalog/mencollection" element={<CommonListPage />}></Route>
                            <Route path="/magazine" element={<CommonListPage />}></Route>
                            <Route path="/buyers" element={<CommonListPage />}></Route>
                            <Route path="/main" element={<CommonListPage />}></Route>
                            <Route path="/registration" element={<SendForm />}></Route>
                            <Route path="/login" element={<LoginForm />}></Route>
                            <Route path="/profile" element={<Profile />}></Route>
                            <Route path="/profile/edit" element={<EditProfile />}></Route>
                            <Route path="/wishlist" element={<WishListPage />}></Route>
                            <Route path="/basket" element={<BasketPage />}></Route>
                            <Route path="/catalog" element={<CommonListPage />} ></Route>
                            <Route path="/catalog/search" element={<SearchPage />} />
                            <Route path="/catalog/womancollection" element={<CommonListPage />} />
                            <Route path="/catalog/womancollection/:id" element={<SinglePageItem />} />
                            <Route path="/catalog/womancollection/verhnaa-odezda" element={<RenderListPage dataType='verhnaa-odezda' />} />
                            <Route path="/catalog/womancollection/verhnaa-odezda/:id" element={<SinglePageItem />} />
                            <Route path="/catalog/womancollection/jackets" element={<RenderListPage dataType='verhnaa-odezda' />} />
                            <Route path="/catalog/womancollection/jackets/:id" element={<SinglePageItem />} />
                            <Route path="/catalog/womancollection/downjacket2" element={<RenderListPage dataType='verhnaa-odezda' />} />
                            <Route path="/catalog/womancollection/downjacket2/:id" element={<SinglePageItem />} />
                            <Route path="/catalog/womancollection/trikotaz" element={<RenderListPage dataType='trikotaz' />} />
                            <Route path="/catalog/womancollection/trikotaz/:id" element={<SinglePageItem />} />
                            <Route path="/catalog/womancollection/coats" element={<RenderListPage dataType='verhnaa-odezda' />} />
                            <Route path="/catalog/womancollection/coats/:id" element={<SinglePageItem />} />
                            <Route path="/catalog/womancollection/obuv" element={<RenderListPage dataType='obuv' />} />
                            <Route path="/catalog/womancollection/obuv/:id" element={<SinglePageItem />} />
                            <Route path="/catalog/womancollection/zakety" element={<RenderListPage dataType='verhnaa-odezda' />} />
                            <Route path="/catalog/womancollection/zakety/:id" element={<SinglePageItem />} />
                            <Route path="/catalog/womancollection/t-shirts" element={<RenderListPage dataType='trikotaz' />} />
                            <Route path="/catalog/womancollection/t-shirts/:id" element={<SinglePageItem />} />
                            <Route path="/catalog/womancollection/ubki" element={<RenderListPage dataType='jeans' />} />
                            <Route path="/catalog/womancollection/ubki/:id" element={<SinglePageItem />} />
                            <Route path="/catalog/womancollection/dress" element={<RenderListPage dataType='trikotaz' />} />
                            <Route path="/catalog/womancollection/dress/:id" element={<SinglePageItem />} />
                            <Route path="/catalog/womancollection/jeans" element={<RenderListPage dataType='jeans' />} />
                            <Route path="/catalog/womancollection/jeans/:id" element={<SinglePageItem />} />
                            <Route path="/catalog/womancollection/bodybasics" element={<RenderListPage dataType='trikotaz' />} />
                            <Route path="/catalog/womancollection/bodybasics/:id" element={<SinglePageItem />} />
                        </Routes>
                    {/* </Suspense> */}
                    {window.location.pathname !== "/basket" && <PageFooter />}
                </main>
            </ScrollToTop>
        </Router>
    )
}

export default App;
//  "start": "concurrently \"react-scripts start\" \"node --experimental-modules server.js\"",
// const routes = [
//     { path: "/", Element: <MainPage /> },
//     { path: "/catalog/womancollection/new", Element: <CommonListPage /> },
//     { path: "/catalog/mencollection", Element: <CommonListPage /> },
//     { path: "/magazine", Element: <CommonListPage /> },
//     { path: "/buyers", Element: <CommonListPage /> },
//     { path: "/main", Element: <CommonListPage /> },
//     { path: "/registration", Element: <SendForm /> },
//     { path: "/login", Element: <LoginForm /> },
//     { path: "/profile", Element: <Profile /> },
//     { path: "/profile/edit", Element: <EditProfile /> },
//     { path: "/wishlist", Element: <WishListPage /> },
//     { path: "/basket", Element: <BasketPage /> },
//     { path: "/catalog", Element: <CommonListPage /> },
//     { path: "/catalog/search", Element: <SearchPage /> },
//     { path: "/catalog/womancollection", Element: <CommonListPage /> },
//     { path: "/catalog/womancollection/:id", Element: <SinglePageItem /> },
//     { path: "/catalog/womancollection/verhnaa-odezda", Element: <RenderListPage dataType='verhnaa-odezda' /> },
//     { path: "/catalog/womancollection/verhnaa-odezda/:id", Element: <SinglePageItem /> },
//     { path: "/catalog/womancollection/jackets", Element: <RenderListPage dataType='verhnaa-odezda' /> },
//     { path: "/catalog/womancollection/jackets/:id", Element: <SinglePageItem /> },
//     { path: "/catalog/womancollection/downjacket2", Element: <RenderListPage dataType='verhnaa-odezda' /> },
//     { path: "/catalog/womancollection/downjacket2/:id", Element: <SinglePageItem /> },
//     { path: "/catalog/womancollection/trikotaz", Element: <RenderListPage dataType='trikotaz' /> },
//     { path: "/catalog/womancollection/trikotaz/:id", Element: <SinglePageItem /> },
//     { path: "/catalog/womancollection/coats", Element: <RenderListPage dataType='verhnaa-odezda' /> },
//     { path: "/catalog/womancollection/coats/:id", Element: <SinglePageItem /> },
//     { path: "/catalog/womancollection/obuv", Element: <RenderListPage dataType='obuv' /> },
//     { path: "/catalog/womancollection/obuv/:id", Element: <SinglePageItem /> },
//     { path: "/catalog/womancollection/zakety", Element: <RenderListPage dataType='verhnaa-odezda' /> },
//     { path: "/catalog/womancollection/zakety/:id", Element: <SinglePageItem /> },
//     { path: "/catalog/womancollection/t-shirts", Element: <RenderListPage dataType='trikotaz' /> },
//     { path: "/catalog/womancollection/t-shirts/:id", Element: <SinglePageItem /> },
//     { path: "/catalog/womancollection/ubki", Element: <RenderListPage dataType='jeans' /> },
//     { path: "/catalog/womancollection/ubki/:id", Element: <SinglePageItem /> },
//     { path: "/catalog/womancollection/dress", Element: <RenderListPage dataType='trikotaz' /> },
//     { path: "/catalog/womancollection/dress/:id", Element: <SinglePageItem /> },
//     { path: "/catalog/womancollection/jeans", Element: <RenderListPage dataType='jeans' /> },
//     { path: "/catalog/womancollection/jeans/:id", Element: <SinglePageItem /> },
//     { path: "/catalog/womancollection/bodybasics", Element: <RenderListPage dataType='trikotaz' /> },
//     { path: "/catalog/womancollection/bodybasics/:id", Element: <SinglePageItem /> },

// ]