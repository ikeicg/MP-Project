# MP-Project

It is a basic **Music Player** App written in Javascript. The songs and other media files are stored/based in the local directory (no APIs). The entry file is **_index.html_**

# Features

1. **Music Play**
2. **Music Controls including Play/Pause, Next/Previous Songs, Shuffle/Repeat One/Repeat All and Progress Bar Seeking**
3. **Genre Classification**
4. **Playlist Generation**
5. **Music Search**

# How to Use

1. Add media files
   - Add audio/music files to the **"audio"** directory (mp3 preferably)
   - add song banner pictures to the **"trackimg"** directory which is inside the **"img"** directory (jpg/png preferably)
   - Your additions should be at least 11 songs/pictures because two sections generate a random playlist of 10 songs
2. Navigate to the **"db.js"** in the **"js"** directory and add objects to the allSongs array inorder to create a data structure for each of your added songs; in this manner accurately:

   - ```JavaScript
     let allSongs = [
       {
           name: "<songname>",
           artiste: "<artistename>",
           image: "/img/trackimg/<songname.jpg">,
           source: "/audio/<songname.mp3>",
           genre: "<afrobeats, reggae, country, gospel, pop>",
       },
           //more songs...

       ];

     let currentlyPlaying = [0, allSongs];

     ```

   - save the file changes

3. Open the entry file in your browser. Enjoy the MP after much stress

4. **N/B:** The icons need Internet Connection to render
l
# Demo

![demo1]("https://github.com/ikeicg/MP-Project/blob/demoimg/demo1.png")

![demo2]("https://github.com/ikeicg/MP-Project/blob/demoimg/demo2.png")

![demo3]("https://github.com/ikeicg/MP-Project/blob/demoimg/demo3.png")

![demo4]("https://github.com/ikeicg/MP-Project/blob/demoimg/demo4.png")
