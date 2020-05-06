export interface User {

 
    id: number;
    name: string;
    email: string;
    fb_id: string;
    sex: string;
    age: number;
    relationship_status: string;
    about_me: string;
    city: string;
    country: string;
    is_private: boolean;
    followers_count: number;
    dob: string;
    image_album: [
      {
        image_url: string;
        position: boolean;
        is_profile: boolean;
      }
    ];
  
}
