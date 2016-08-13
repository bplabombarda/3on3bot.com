module Main exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)


-- import Html.App as App

import TimeTravel.Html.App as TimeTravel
import Components.Navigation exposing (navigation)


-- model


type alias Model =
    Int


initModel : Model
initModel =
    0



-- update


type Msg
    = AddCalorie
    | Clear


update : Msg -> Model -> Model
update msg model =
    case msg of
        AddCalorie ->
            model + 1

        Clear ->
            initModel



-- view


view : Model -> Html Msg
view model =
    div []
        [ navigation
        , h3 []
            [ text ("Total Calories: " ++ (toString model)) ]
        , button
            [ type' "button"
            , onClick AddCalorie
            ]
            [ text "Add" ]
        , button
            [ type' "button"
            , onClick Clear
            ]
            [ text "Clear" ]
        , div
            [ class "imgContainer" ]
            [ img
                [ src "./img/rosie.jpg"
                , alt "Rosie"
                ]
                []
            ]
        ]


main : Program Never
main =
    -- App.beginnerProgram
    TimeTravel.beginnerProgram
        { model = initModel
        , update = update
        , view = view
        }
