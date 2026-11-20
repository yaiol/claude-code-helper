//! Icons the `dioxus-free-icons` release does not have: lucide glyphs it does not ship yet, drawn the way
//! it draws its own (same view box, stroke and caps).

use dioxus::prelude::*;
use dioxus_free_icons::IconShape;

macro_rules! lucide {
    ($(#[$doc:meta])* $name:ident, [$($d:literal),+ $(,)?]) => {
        $(#[$doc])*
        #[derive(Clone, Copy, PartialEq)]
        pub struct $name;

        impl IconShape for $name {
            fn view_box(&self) -> &str {
                "0 0 24 24"
            }
            fn xmlns(&self) -> &str {
                "http://www.w3.org/2000/svg"
            }
            fn fill_and_stroke<'a>(&self, user_color: &'a str) -> (&'a str, &'a str, &'a str) {
                ("none", user_color, "2")
            }
            fn stroke_linecap(&self) -> &str {
                "round"
            }
            fn stroke_linejoin(&self) -> &str {
                "round"
            }
            fn child_elements(&self) -> Element {
                rsx! {
                    $( path { d: $d } )+
                }
            }
        }
    };
}

lucide!(
    /// lucide `list-chevrons-down-up`.
    LdListChevronsDownUp,
    ["M3 5h8", "M3 12h8", "M3 19h8", "m15 5 3 3 3-3", "m15 19 3-3 3 3"]
);
lucide!(
    /// lucide `list-chevrons-up-down`.
    LdListChevronsUpDown,
    ["M3 5h8", "M3 12h8", "M3 19h8", "m15 8 3-3 3 3", "m15 16 3 3 3-3"]
);
