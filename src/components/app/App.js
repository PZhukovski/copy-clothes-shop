import { lazy, Suspense } from 'react';

import { HashRouter as Router, Route, Routes, location as useLocation } from 'react-router-dom';
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


const App = () => {

    return (
        <Router>
            <ScrollToTop>
                <main className="app"  >
                    <PageHeader />
                    {/* <Suspense fallback={<Spinner />}> */}
                        <Routes >
                            <Route exact path="/" element={<MainPage />}></Route>
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
