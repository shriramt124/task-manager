"use client"
import { useGlobalState } from "@/app/context/globalProvider"
import Image from "next/image"
import styled from "styled-components"
import menu from "@/app/utils/menue";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useClerk,UserButton, useUser } from "@clerk/nextjs";
 
 

function Sidebar() {

    const {theme,collapsed,collapseMenu} = useGlobalState()
   const router  = useRouter();
    // console.log(theme)
    const pathname = usePathname();
    const {signOut}  = useClerk();
    const user = useUser()
    console.log(user)
    const {firstName,lastName,imageUrl} = user.user || {firstName:"",lastName:"",imageUrl:""}

    console.log(firstName,lastName);



    console.log(pathname)

   const handleClickLink = (link:string) =>{
     router.push(link);
   }

  return (
    <SidebarStyled theme={theme} collapsed={collapsed}>
        <button className="toggle-nav" onClick={collapseMenu}>
        {collapsed ?<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
  <path fillRule="evenodd" d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
</svg>

 : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
 <path fillRule="evenodd" d="M7.28 7.72a.75.75 0 0 1 0 1.06l-2.47 2.47H21a.75.75 0 0 1 0 1.5H4.81l2.47 2.47a.75.75 0 1 1-1.06 1.06l-3.75-3.75a.75.75 0 0 1 0-1.06l3.75-3.75a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
</svg>

}
      </button>
      <div className="profile">
        <div className="profile-overlay"></div>
        <div className="image">
        <Image width={70} height={70}  alt="profile" src={imageUrl} />
        </div>
        <div className="user-btn absolute z-20 top-0 w-full h-full">
          <UserButton />
        </div>
        <h1 className="capitalize">
          <span>{firstName}</span>
           <span>{lastName}</span>
        </h1>
         
      </div>
      <ul className="nav-items">
        {
          menu.length > 0 &&  menu.map((item) => (
           <li key={item.id} className={`nav-item ${pathname === item.link ? "active":""}`} onClick={() => handleClickLink(item.link)}>
            <span className="text-center items-center mt-3">
            {item.icon}  
            </span>
            
             <Link className="mt-3" href={item.link}>{item.title}</Link>
           </li>
          )) 
        }
      </ul>
      <button className="p-2" onClick={()=>signOut(()=>router.push("/"))}>signout</button>

    </SidebarStyled>
  )
}



export default Sidebar
const SidebarStyled = styled.nav<{collapsed:boolean}>`
 width:${(props) => props.theme.sidebarWidth};
background-color:${(props) => props.theme.colorBg2};
 width:${(props) => props.theme.sidebarWidth};
border:2px solid ${(props) => props.theme.borderColor2};
border-radius:1rem;
position: relative;
display:flex;
justify-content:space-between;
flex-direction: column;
color:${(props) => props.theme.colorGrey3};

@media screen and (max-width: 768px) {
    position: fixed;
    height: calc(100vh - 2rem);
    z-index: 100;

    transition: all 0.3s cubic-bezier(0.53, 0.21, 0, 1);
    transform: ${(props) =>
      props.collapsed ? "translateX(-107%)" : "translateX(0)"};

    .toggle-nav {
      display: block !important;
    }
  }

  .toggle-nav {
    display: none;
    padding: 0.8rem 0.9rem;
    position: absolute;
    right: -69px;
    top: 1.8rem;

    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;

    background-color: ${(props) => props.theme.colorBg2};
    border-right: 2px solid ${(props) => props.theme.borderColor2};
    border-top: 2px solid ${(props) => props.theme.borderColor2};
    border-bottom: 2px solid ${(props) => props.theme.borderColor2};
  }

.profile{
  margin:1.5rem;
  position:relative;
  padding:1rem 0.8;
  border-radius:1rem;
  cursor:pointer;
  font-weight:500;
  color:${(props) => props.theme.colorGrey0};
  display:flex;
  align-items:center;
   gap:1rem;
   
 .profile-overlay{
 position:absolute;
 top:0;
 left:0;
 width:100%;
 height:100%;
 backdrop-filter:blue(10px);
 z-index:0;
 background:${(props) => props.theme.colorBg3};
 transition:all 0.55s linear;
 opacity:0.2;
 border-radius:1rem;
 border:2px solid ${(props) => props.theme.borderColor2};
 }
 h1{
  font-size:1.2rem;
  display:flex;
  flex-direction:column;
  line-height:1.5rem;
 }
 .image,h1{
  position:relative;
  z-index:1;
 }

 .image{
  flex-shrink:0;
  display:inline-block;
  overflow:hidden;
  width:70px;
  height:70px;
  align-tracks: center;
  text-align: center;
  margin-top:0.5rem;
  margin-left:0.5rem;

  img{
    border-radius: 100%;
    transition:all 0.5s ease;
    z-index: 2;
  }
 }
 >h1{
  margin-left:0.8rem;
  font-size:clamp(1.2rem,4vw,1.4rem);
  line-height:100%;
 }
 &:hover{
  .profile-overlay{
    opacity:1;
    border:2px solid ${(props) => props.theme.borderColor2};
  }
  img{
    transform:scale(1.1);
  }
 }
 .user-btn{
  .cl-rootBox{
    width:100%;
    height:100%;
  }
  .col-userButtonBox{ 
    width:100%;
    height:100%;
  }
  .cl-userButtonTrigger{
    width:100%;
    height:100%;
    opacity: 0;
  }
 }

}
.nav-items li{
 
  display:flex;
  gap:1rem;
   
  
}

.nav-item{
  padding:0 .7rem 1rem;
  padding-left:2.1rem;
  margin:0.3rem 0;
   display:grid;
   grid-template-columns: 40px 1fr;
   cursor:pointer;
   position:relative;

   &::after{
    position:absolute;
    content:"";
    left:0;
    top:0;
    width:0;
    height:100%;
    background-color:${(props) =>  props.theme.activeNavLinkHover};
    z-index:1;
    transition:all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
   }

   &::before{
    position:absolute;
    content:"";
    left:0;
    top:0;
    width:0;
    height:100%;
    background-color:${(props) =>  props.theme.colorGreenDark};
    z-index:1;
    transition:all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
    border-bottom-left-radius:5px;
    border-top-left-radius:5px;
   }

   a{
    font-weight: 500;
    transition:all 0.3s ease-in-out;
    z-index:2;
    align-items:center;
    text-align:center;
   }
    
   &:hover{
    &::after{
      width:100%;
    }
   }
   &.active{
    background-color:${(props) => props.theme.activeNavLink}
   }  
   &.active::before{
    width:0.3rem;
   }
   
  

}
button{
  margin:1.5rem 0;
  text-transform:capitalize;
  transition:all 0.3s ease ;
  &:hover{
  background-color:${(props) => props.theme.activeNavLink};
  }
}

`
