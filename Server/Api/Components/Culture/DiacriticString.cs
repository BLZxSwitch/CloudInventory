﻿using System.Globalization;
using System.Linq;
using System.Text;

namespace Api.Components.Culture
{
    public static class DiacriticString
    {
        public static string RemoveDiacritics(this string str)
        {
            if (null == str) return null;
            var chars =
                from c in str.Normalize(NormalizationForm.FormD).ToCharArray()
                let uc = CharUnicodeInfo.GetUnicodeCategory(c)
                where uc != UnicodeCategory.NonSpacingMark
                select c;

            var cleanStr = new string(chars.ToArray()).Normalize(NormalizationForm.FormC);

            return cleanStr;
        }
    }
}
