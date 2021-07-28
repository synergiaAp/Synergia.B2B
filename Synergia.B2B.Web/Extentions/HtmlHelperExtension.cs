using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web;
using System.Web.Mvc;
using System.Web.Mvc.Html;

namespace Synergia.B2B.Web.Extensions
{
    public static class HtmlHelperExtension
    {
        #region CheckBoxAwesome
        public static MvcHtmlString CheckBoxAwesome(this HtmlHelper htmlHelper, string name)
        {
            return new MvcHtmlString(GetHtmlWithoutHiddenInput(htmlHelper.CheckBox(name).ToHtmlString().Trim()));
        }

        public static MvcHtmlString CheckBoxAwesome(this HtmlHelper htmlHelper, string name, bool isChecked)
        {
            return new MvcHtmlString(GetHtmlWithoutHiddenInput(htmlHelper.CheckBox(name, isChecked).ToHtmlString().Trim()));
        }

        public static MvcHtmlString CheckBoxAwesome(this HtmlHelper htmlHelper, string name, bool isChecked, object htmlAttributes)
        {
            return new MvcHtmlString(GetHtmlWithoutHiddenInput(htmlHelper.CheckBox(name, isChecked, htmlAttributes).ToHtmlString().Trim()));
        }

        public static MvcHtmlString CheckBoxAwesome(this HtmlHelper htmlHelper, string name, object htmlAttributes)
        {
            return new MvcHtmlString(GetHtmlWithoutHiddenInput(htmlHelper.CheckBox(name, htmlAttributes).ToHtmlString().Trim()));
        }

        public static MvcHtmlString CheckBoxAwesome(this HtmlHelper htmlHelper, string name, IDictionary<string, object> htmlAttributes)
        {
            return new MvcHtmlString(GetHtmlWithoutHiddenInput(htmlHelper.CheckBox(name, htmlAttributes).ToHtmlString().Trim()));
        }

        public static MvcHtmlString CheckBoxAwesome(this HtmlHelper htmlHelper, string name, bool isChecked, IDictionary<string, object> htmlAttributes)
        {
            return new MvcHtmlString(GetHtmlWithoutHiddenInput(htmlHelper.CheckBox(name, isChecked, htmlAttributes).ToHtmlString().Trim()));
        }

        public static MvcHtmlString CheckBoxAwesomeFor<TModel>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, bool>> expression)
        {
            return new MvcHtmlString(GetHtmlWithoutHiddenInput(htmlHelper.CheckBoxFor<TModel>(expression).ToHtmlString().Trim()));
        }

        public static MvcHtmlString CheckBoxAwesomeFor<TModel>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, bool>> expression, object htmlAttributes)
        {
            return new MvcHtmlString(GetHtmlWithoutHiddenInput(htmlHelper.CheckBoxFor<TModel>(expression, htmlAttributes).ToHtmlString().Trim()));
        }

        public static MvcHtmlString CheckBoxAwesomeFor<TModel>(this HtmlHelper<TModel> htmlHelper, Expression<Func<TModel, bool>> expression, IDictionary<string, object> htmlAttributes)
        {
            return new MvcHtmlString(GetHtmlWithoutHiddenInput(htmlHelper.CheckBoxFor<TModel>(expression, htmlAttributes).ToHtmlString().Trim()));
        }

        private static string GetHtmlWithoutHiddenInput(string text)
        {
            return text.Substring(0, text.IndexOf("<input", 1));
        }
        #endregion

        #region Menu
        public static string SetupMultilevelMenu(this HtmlHelper html, string controller)
        {
            string currentController = html.ViewContext.RouteData.Values["controller"].ToString().ToLower();

            return controller.ToLower().Split(';').Contains(currentController) ? "in" : "";
        }

        public static string SetMenuItemActive(this HtmlHelper html, string controller, string action)
        {
            string currentController = html.ViewContext.RouteData.Values["controller"].ToString().ToLower();
            string currentAction = html.ViewContext.RouteData.Values["action"].ToString().ToLower();

            return controller.ToLower().Split(';').Contains(currentController) && action.ToLower().Split(';').Contains(currentAction) ? "active" : "";
        }
        #endregion 
    }
}
