// import { CSSTransition, TransitionGroup } from 'react-transition-group';
// import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
// import SendForm from '../pages/registration/sendForm/SendForm';
// import LoginForm from '../pages/login/Login-form';
// import Profile from '../pages/profile/Profile';
// import EditProfile from '../pages/EditProfile/EditProfile';
// import MainPage from '../pages/MainPage/MainPage';
// import SearchPage from '../pages/SearchPage/SearchPage';
// import ShoesListPage from '../pages/womanClothes/shoesPage/ShoesListPage';
// import RenderListPage from '../pages/womanClothes/shoesPage/RenderListPage';
// import SinglePageItem from '../pages/womanClothes/SinglePageItem';
// import WishListPage from '../pages/WishListPage/WishListPage';
// import BasketPage from '../pages/BasketPage/BasketPage';
// import PageFooter from '../pageFooter/PageFooter';

// import React, { Component } from 'react'

// const AnimatedRoutes = () => {
//     const location = useLocation();
//     console.log(location);
//     return (
//         // <TransitionGroup>
//         //     <CSSTransition key={location.key} classNames='page' timeout={2000}>
//                 <Routes>
//                     <Route path="/" element={<MainPage />}></Route>
//                     <Route path="/catalog/womancollection/new" element={<ShoesListPage />}></Route>
//                     <Route path="/catalog/mencollection" element={<ShoesListPage />}></Route>
//                     <Route path="/magazine" element={<ShoesListPage />}></Route>
//                     <Route path="/buyers" element={<ShoesListPage />}></Route>
//                     <Route path="/main" element={<ShoesListPage />}></Route>
//                     <Route path="/registration" element={<SendForm />}></Route>
//                     <Route path="/login" element={<LoginForm />}></Route>
//                     <Route path="/profile" element={<Profile />}></Route>
//                     <Route path="/profile/edit" element={<EditProfile />}></Route>
//                     <Route path="/wishlist" element={<WishListPage />}></Route>
//                     <Route path="/basket" element={<BasketPage />}></Route>
//                     <Route path="/catalog" element={<ShoesListPage />} ></Route>
//                     <Route path="/catalog/search" element={<SearchPage />} />
//                     <Route path="/catalog/womancollection" element={<ShoesListPage />} />
//                     <Route path="/catalog/womancollection/:id" element={<SinglePageItem />} />
//                     <Route path="/catalog/womancollection/verhnaa-odezda" element={<RenderListPage dataType='verhnaa-odezda' />} />
//                     <Route path="/catalog/womancollection/verhnaa-odezda/:id" element={<SinglePageItem />} />
//                     <Route path="/catalog/womancollection/jackets" element={<RenderListPage dataType='verhnaa-odezda' />} />
//                     <Route path="/catalog/womancollection/jackets/:id" element={<SinglePageItem />} />
//                     <Route path="/catalog/womancollection/downjacket2" element={<RenderListPage dataType='verhnaa-odezda' />} />
//                     <Route path="/catalog/womancollection/downjacket2/:id" element={<SinglePageItem />} />
//                     <Route path="/catalog/womancollection/trikotaz" element={<RenderListPage dataType='trikotaz' />} />
//                     <Route path="/catalog/womancollection/trikotaz/:id" element={<SinglePageItem />} />
//                     <Route path="/catalog/womancollection/coats" element={<RenderListPage dataType='verhnaa-odezda' />} />
//                     <Route path="/catalog/womancollection/coats/:id" element={<SinglePageItem />} />
//                     <Route path="/catalog/womancollection/obuv" element={<RenderListPage dataType='obuv' />} />
//                     <Route path="/catalog/womancollection/obuv/:id" element={<SinglePageItem />} />
//                     <Route path="/catalog/womancollection/zakety" element={<RenderListPage dataType='verhnaa-odezda' />} />
//                     <Route path="/catalog/womancollection/zakety/:id" element={<SinglePageItem />} />
//                     <Route path="/catalog/womancollection/t-shirts" element={<RenderListPage dataType='trikotaz' />} />
//                     <Route path="/catalog/womancollection/t-shirts/:id" element={<SinglePageItem />} />
//                     <Route path="/catalog/womancollection/ubki" element={<RenderListPage dataType='jeans' />} />
//                     <Route path="/catalog/womancollection/ubki/:id" element={<SinglePageItem />} />
//                     <Route path="/catalog/womancollection/dress" element={<RenderListPage dataType='trikotaz' />} />
//                     <Route path="/catalog/womancollection/dress/:id" element={<SinglePageItem />} />
//                     <Route path="/catalog/womancollection/jeans" element={<RenderListPage dataType='jeans' />} />
//                     <Route path="/catalog/womancollection/jeans/:id" element={<SinglePageItem />} />
//                     <Route path="/catalog/womancollection/bodybasics" element={<RenderListPage dataType='trikotaz' />} />
//                     <Route path="/catalog/womancollection/bodybasics/:id" element={<SinglePageItem />} />
//                 </Routes>
//         //     </CSSTransition>
//         // </TransitionGroup>
//     )


// }
// export default AnimatedRoutes;