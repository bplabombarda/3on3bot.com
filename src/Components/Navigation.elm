module Components.Header exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)


-- header component


navigation : Html a -> Html b
navigation model =
    div
        [ class "h1" ]
        [ text ("Frigg off, Barb!") ]
