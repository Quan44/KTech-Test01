import { GroupOutlined, UserOutlined } from "@ant-design/icons";
import type { RouteItem } from "../../routes";
import EmployeeListPage from "./pages/EmployeeListPage";

export const routesAdministrator: RouteItem[] = [
  {
    label: 'Administrators',
    key: 'administrators',
    icon: <UserOutlined />,
    isShowMenu: true,
    isPrivate: true,
    children: [
      {
        path: '/administrators/employees',
        label: 'Employees',
        icon: <UserOutlined />,
        key: 'administrators-employees',
        element: <EmployeeListPage />,
        isShowMenu: true,
        isPrivate: true,
      },
      {
        path: '/administrators/roles',
        label: 'Roles',
        icon: <GroupOutlined />,
        key: 'administrators-roles',
        element: null,
        isShowMenu: true,
        isPrivate: true,
      },
    ],
  },
]