import { createBrowserRouter, Navigate } from "react-router"

import Root from "../routes/Root"
import Projects from "../routes/Projects"

import Videos from "../routes/Videos"
import ContentLayout from "../layouts/ContentLayout"
import ProjectDetail from "../routes/ProjectDetail"
import ProductDetail from "../routes/ProductDetail"
import Products from "../routes/Products"
import AdminDashboard from "../routes/AdminDashboard"
import ProjectForm from "@/components/ProjectsDashboard/ProjectForm"
import PurchaseCompletion from "@/routes/PurchaseCompletion"
import About from "@/routes/About"

export const router = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        children: [
            {
                Component: ContentLayout,
                children: [
                    {
                        index: true,
                        element: <Navigate to="/projects" replace />,
                    },
                    {
                        path: "projects",
                        Component: Projects,
                    },

                    {
                        path: "projects/:id",
                        Component: ProjectDetail,
                    },

                    // Product View
                    {
                        path: "products/:id",
                        Component: ProductDetail,
                    },

                    {
                        path: "videos",
                        Component: Videos,
                    },
                    {
                        path: "store",
                        Component: Products,
                    },
                    {
                        path: "/success",
                        Component: PurchaseCompletion,
                    },
                    {
                        path: "/about",
                        Component: About,
                    },

                    ...(import.meta.env.DEV
                        ? [
                              {
                                  path: "admin",
                                  Component: AdminDashboard,
                              },
                              {
                                  path: "projects/create",
                                  Component: ProjectForm,
                              },
                              {
                                  path: "projects/edit/:id",
                                  Component: ProjectForm,
                              },
                          ]
                        : []),
                ],
            },
        ],
    },
])
