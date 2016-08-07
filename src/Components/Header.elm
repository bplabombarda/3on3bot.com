module Components.Header exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)


-- header component


header : Html a -> Html b
header model =
    div
        [ class "h1" ]
        [ text ("Frigg off, Barb!") ]
