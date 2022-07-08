# Emotion-Annotator

Emotion-Annotator is a React based web application than acts as an interface to OpenFace to generate CSV files containing extracted facial features and
an user-provided emotion annotation.

The generated CSV file can be used as a dataset to train ML models for tasks like emotion recognition.

## Usage
**Note:** Install and test run the dockerised version of OpenFace from its Github repo before proceeding

There are tow types of inputs: images and video.
### Images
The user can upload one or more images in .png or .jpg format. 

The generated .csv file will contain a row of data for each uploaded image. The last column contains the emotion annotation.

### Video
**Note:** The intended purpose of a video input is to capture a number of frames from the video file and upload those frames as input images.

1. Upload a .mp4 video file
2. While the video is paused, move the seek bar of the video player to the position where the frame needs to be captured.
3. Click on _Capture Frame_![Screenshot from 2022-07-09 01-44-28](https://user-images.githubusercontent.com/71932686/178064267-a01a8a55-15cf-464a-9ac1-14da42ed5176.png)
 button. You can also click on it while the video is playing to capture the current frame.

After the frames have been captured, they can be uploaded in the same way as images.







