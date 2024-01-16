import { Layout, Menu } from "antd";

const { Header, Content, Sider } = Layout;

const items = [
  {
    key: "dashboard",
    label: "Dashboard",
  },
  {
    key: "faculty",
    label: "Faculty",
  },
  {
    key: "user",
    label: "Manage users",
    children: [
      {
        key: "create/user",
        label: "Create user",
      },
      {
        key: "update/user",
        label: "Update user",
      },
      {
        key: "delete/user",
        label: "Delete user",
      },
    ],
  },
];

const MainLayout = () => {
  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div
          className="demo-logo-vertical"
          style={{
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "17px",
          }}
        >
          <h2>PHU</h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={items}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0 }} />
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <p>main context throw here</p>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
