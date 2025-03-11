import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import Userlogin from './pages/Auth/Userlogin';
import { AddProduct } from './pages/AddProduct';
import { Addrec } from './pages/recipe/Addrec';
import AboutUs from './pages/AboutUs';
import Userhome from './pages/Userhome';
import Usersignup from './pages/Auth/Usersignup';
import Adminhome from './pages/Adminhome';
import { Deleteproduct } from './pages/product/Deleteproduct';
import { Deleterec } from './pages/recipe/Deleterec';
import { ProductList } from './pages/product/ProductList';
import { Searchproduct } from './pages/product/Searchproduct';
import { Viewproduct } from './pages/Viewproduct';
import { Searchrec } from './pages/recipe/Searchrec';
import { Viewrec } from './pages/recipe/Viewrec';
import WhyOrganicSustainable from './pages/WhyOrganicSustainable';
import { Addtip } from './pages/tips/Addtip';
import { Deltip } from './pages/tips/Deltip';
import { Sertip } from './pages/tips/Sertip';
import { Viewtip } from './pages/tips/Viewtip';
import { Rec } from './pages/recipe/Rec';
import { Tip } from './pages/tips/Tip';
import { Product } from './pages/product/Product';
import Viewuser from './pages/Viewuser';
import DeleteUser from './pages/DeleteUser';
import OrderDetails from './pages/account/OrderDetails';


import SoldProducts from './pages/account/SoldProducts';
import ReceivedOrders from './pages/account/ReceivedOrders';
import UserDetails from './pages/account/UserDetails';
import UserOrders from './pages/account/UserOrders';
import Fconfirmation from './pages/Fcofirmation';
import ConfirmFarmer from './pages/ConfirmFarmer';
import UserRoute from './utils/userRoute'
import AdminRoute from './utils/adminRoute'
import Complaints from './pages/complaint/Complaints';
import ComplaintList from './pages/complaint/ComplaintList';

import Owncomplaint from './pages/complaint/Owncomplaint';
import ProductFeedBack from './pages/account/ProductFeedBack';
import { UserFeedbacks } from './pages/account/UserFeedbacks';
import AddBlog from './pages/blogs/AddBlog';
import MyBlogs from './pages/blogs/MyBlogs';
import AllBlogs from './pages/blogs/AllBlogs';
import { Ownrec } from './pages/recipe/Ownrec';
import Owntip from './pages/tips/Owntip';
import EditProduct from './pages/account/EditProduct';
import CropYieldPredictor from './Components/CropYieldPredictor';
import Sellerhome from './pages/Sellerhome';
import { SeedList } from './pages/product/SeedList';
import { FertilizersList } from './pages/product/FertilizersList ';
import SellerProfile from './pages/account/SellerProfile';
import Viewbuyer from './pages/Viewbuyer';
import SellerComplaints from './pages/complaint/SellerComplaint';
import UserComplaints from './pages/complaint/UserComplaints';
import AdminComplaints from './pages/complaint/AdminComplaints';
import SendAnnouncement from './pages/Annoucement/SendAnnouncement';
import ViewAnnouncements from './pages/Annoucement/ViewAnnoucement';
import ViewAnnouncementsbyadmin from './pages/Annoucement/ViewAnnoucementbyadmin';





function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/'element={(<Home/>)}/>
    <Route path='/login'element={(<Userlogin/>)}/>
    <Route path='/signup'element={(<Usersignup/>)}/>
    

    <Route element={<UserRoute />}>
    <Route path='/userhome'element={(<Userhome/>)}/>
    <Route path='/addpro'element={(<AddProduct/>)}/>
    <Route path='/addrec'element={(<Addrec/>)}/>
    <Route path='/abt'element={(<AboutUs/>)}/>
    <Route path='/deletepro'element={(<Deleteproduct/>)}/>
    <Route path='/deleterec'element={(<Deleterec/>)}/>
    <Route path='/buy'element={(<ProductList/>)}/>
    <Route path='/searchpro'element={(<Searchproduct/>)}/>
    <Route path='/viewpro'element={(<Viewproduct/>)}/>
    <Route path='/viewrec'element={(<Viewrec/>)}/>
    <Route path='/why'element={(<WhyOrganicSustainable/>)}/>
    <Route path='/addtip'element={(<Addtip/>)}/>
    <Route path='/deletetip'element={(<Deltip/>)}/>
    <Route path='/viewtips'element={(<Viewtip/>)}/>
    <Route path='/recipes'element={(<Rec/>)}/>
    <Route path='/tips'element={(<Tip/>)}/>
    
    <Route path='/complaintadd'element={(<Complaints/>)}/>
    <Route path='/user/complaint'element={(<Owncomplaint/>)}/>
  
    <Route path='ufeedback'element={(<UserFeedbacks/>)}/>
  
    <Route path='/uorder'element={(<UserOrders/>)}/>
    <Route path='/own/:id'element={(<UserDetails/>)}/>
    <Route path='/frmr'element={(<Fconfirmation/>)}/>
    <Route path='/addblog'element={(<AddBlog/>)}/>
    <Route path='/myblog'element={(<MyBlogs/>)}/>
    <Route path='/feedback'element={(<ProductFeedBack/>)}/>
    <Route path='/allblog'element={(<AllBlogs/>)}/>
    <Route path='/ownrec'element={(<Ownrec/>)}/>
    <Route path='/owntip'element={(<Owntip/>)}/>
    <Route path="/editproduct/:productId" element={<EditProduct />} />
    <Route path="/sellerhome" element={<Sellerhome/>} />
    <Route path="/seeds" element={<SeedList/>} />
    <Route path="/fertilizers" element={<FertilizersList/>} />
    <Route path="/sellerprofile" element={<SellerProfile/>} />
    <Route path="/sellercom" element={<SellerComplaints/>} />
    <Route path="/ucom" element={<UserComplaints/>} />
    <Route path="/acom" element={<AdminComplaints/>} />
    <Route path="/senda" element={<SendAnnouncement/>} />
    <Route path="/viewa" element={<ViewAnnouncements/>} />
    <Route path="/viewaa" element={<ViewAnnouncementsbyadmin/>} />
    </Route>
    
   
    <Route path='/ml'element={(<CropYieldPredictor/>)}/>
    <Route element={<AdminRoute />}>
    <Route path='/adminhome'element={(<Adminhome/>)}/>
    <Route path='/complaintList'element={(<ComplaintList/>)}/>
    <Route path='/searchrec'element={(<Searchrec/>)}/>
    <Route path='/searchtip'element={(<Sertip/>)}/>
    <Route path='/users'element={(<Viewuser/>)}/>
    <Route path='/deleteuser'element={(<DeleteUser/>)}/>
    <Route path='/orders'element={(<OrderDetails/>)}/>
    <Route path='/products'element={(<Product/>)}/>
    
    <Route path='/own/:id'element={(<UserDetails/>)}/>
    <Route path='/soldproducts/:userId'element={(<SoldProducts/>)}/>
    <Route path='/rcor'element={(<ReceivedOrders/>)}/>
    <Route path='/buyer'element={(<Viewbuyer/>)}/>
    
    </Route>
    
    <Route path='/cfr'element={(<ConfirmFarmer/>)}/>
   
    
    {/* <Route path='/video'element={(<Vedeo/>)}/>
    
     */}
    </Routes>
    </BrowserRouter>
    
  );
}

export default App;
