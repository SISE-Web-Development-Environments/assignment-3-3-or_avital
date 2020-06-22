import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage"),
  },
  {
    path: "/favoriteRecipes",
    name: "favoriteRecipes",
    component: () => import("./pages/FavoriteRecipesPage"),
  },
  {
    path: "/personalRecipes",
    name: "personalRecipes",
    component: () => import("./pages/PersonalRecipesPage"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("./pages/AboutPage"),
  },
  {
    path: "/recipe/:recipeId",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage"),
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
  //   router.beforeEach((to, from, next) => {
  //   if (to.matched.some(route => route.meta.requiresAuth)) {
  //     if (Auth.currentUser) {
  //       next();
  //     } else {
  //       next({ path: '/user/login' });
  //     }
  //   }
  //   next();
  // })
];

export default routes;
