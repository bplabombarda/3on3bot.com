module Components.Navigation exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)


-- header component


navigation : Html a
navigation =
    div [ id "navContainer" ]
        [ ul
            [ class "navigation" ]
            [ li
                [ class "navitem" ]
                [ text "Oct 20" ]
            , li
                [ class "navitem" ]
                [ text "Oct 21" ]
            , li
                [ class "navitem" ]
                [ text "Oct 22" ]
            , li
                [ class "navitem" ]
                [ text "Oct 23" ]
            , li
                [ class "navitem" ]
                [ text "Oct 24" ]
            ]
        ]
