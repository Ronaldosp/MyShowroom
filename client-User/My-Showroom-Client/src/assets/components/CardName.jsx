import "../styling/CategoryCards.scss"

export default function CategoryCards({el , index}){
    const categoryImages = [
        "https://cdn.prod.website-files.com/6751695b5f949fbb13dd9170/67517fd4540593fb2c03d31b_category-thumb-08-p-500.jpg",
        "https://images.unsplash.com/photo-1688398658165-9f404b8617d3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWNsYXJlbiUyMDc2NWx0fGVufDB8fDB8fHww&fm=jpg&q=60&w=3000",
        "https://media.licdn.com/dms/image/v2/D4E10AQF7NPpTVzqZXg/image-shrink_800/image-shrink_800/0/1693036804009?e=2147483647&v=beta&t=ezSWHl0zjxmT5UYJ3BEOhMLNMBdIILApGW5J4XOjcE8",
        "https://ik.imagekit.io/onlock/u7728714411_Cinematic_side_view_of_a_black_Mercedes-Maybach_con_cb6fb14d-4c6e-4d86-a32e-041aa45b23ae.png?tr=w-300",
        "https://images.ctfassets.net/s699s7kh1jys/6gN7So4DsJABmUPSGExtl2/802d0e6758d4eeaf6ea7437e9a33a265/porsche_911_wallpapers_carrera_gts_2_mobile.jpg",
        "https://www.wsupercars.com/thumbnails-phone/Genesis/2022-Genesis-X-Convertible-Concept-005.jpg",
        "https://wallpaper.forfun.com/fetch/af/afb5d036f026d3795724dd5f0ac47fe9.jpeg",
        "https://i.pinimg.com/474x/83/5c/98/835c989c0bb1fd3e8bab192d56d613e8.jpg"

    ];

    const image = categoryImages[index % categoryImages.length];
  return(
    <div className="category-cards-card-container">
        <div className="category-cards-card-title">
            <h5>{el.name}</h5>
        </div>
        <a href="">
            <img src={image} alt={el.name}/>
        </a>
    </div>
  )
}