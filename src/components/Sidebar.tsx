import { CSidebar, CSidebarHeader, CSidebarBrand, CSidebarNav, CNavItem, CNavTitle, CBadge } from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css'

const Sidebar = () => {
    return (
        <div >
            <CSidebar className="border-end h-full" unfoldable>
                <CSidebarHeader className="border-bottom">
                    <CSidebarBrand>CUI</CSidebarBrand>
                </CSidebarHeader>
                <CSidebarNav>
                    <CNavTitle>Nav Title</CNavTitle>
                    <CNavItem href="#"> Nav item</CNavItem>
                    <CNavItem href="/"> With badge <CBadge color="primary ms-auto">NEW</CBadge></CNavItem>
                    <CNavItem href="https://coreui.io"> Download CoreUI</CNavItem>
                    <CNavItem href="https://coreui.io/pro/"> Try CoreUI PRO</CNavItem>
                </CSidebarNav>
            </CSidebar>
        </div>
    )
}

export default Sidebar
