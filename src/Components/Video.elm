module Components.Video exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)


-- video component


videoPlayer : Html a
videoPlayer =
    video
        [ class "videoPlayer"
        , controls True
        , autoplay True
        ]
        [ source
            [ src "../media/jetsons.mp4"
            , type' "video/mp4"
            ]
            []
        , text "Your browser does not support the video tag."
        ]
