import React from 'react';

const BackgroundVideo = (props) => {
    return (
        <div>
            <video id="bg-video" autoPlay loop muted>
                <source 
                src={ props.video }
                //src={ Brume }
                type="video/mp4" />
                Non supporté par le navigateur
            </video>
        </div>
    )
}

export default BackgroundVideo;