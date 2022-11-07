import React, { useEffect, useState } from 'react';
import { TextField, Container, Autocomplete, Stack, Button } from '@mui/material';
import axios from 'axios';
import "./Profile.css";
import endPointObj from "../../Config";
import LocalizedStrings from 'react-localization';
import strings from "../../localization";


function Profile() {

    let local = new LocalizedStrings(strings);

    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [userTags, setUserTags] = useState([]);
    const [tags, setTags] = useState([]);

    const getTags = () => {
        return new Promise((resolve, reject) => {
            axios.get(endPointObj.url + "api/getTags").then((response) => {
                let tagsObj = [];
                
                for (let i = 0; i < response.data.length; i++) {
                    const tag = { tagName: response.data[i].tagName };
                    tagsObj.push(tag);
                }
                
                setTags(tagsObj);

            }).catch((err) => {
                console.log(err);
            });
        });
    }

    const getProfileDetails = () => {
        return new Promise((resolve, reject) => {
            axios.get(endPointObj.url + "api/getProfile", {
                params: {
                    userId: sessionStorage.getItem("id")
                }
            }).then((response) => {
                
                setUserName(response.data.username);
                setEmail(response.data.email);
                setRole(response.data.role);
                let tagsObj = [];
                for (let i = 0; i < response.data.tags.length; i++) {
                    const tag = { tagName: response.data.tags[i] };
                    tagsObj.push(tag);
                }
                
                setUserTags(tagsObj);
            });
        });
    }

    const updateProfile = (name, useremail, userrole, usertagsSet) => {
        let arrayTags = [];
        for (let i = 0; i < usertagsSet.length; i++) {
            arrayTags.push(usertagsSet[i].tagName)
        }
        axios.post(endPointObj.url + "api/editProfile", {
            userId: "625f6f8a179d20a7dca1ef1e",
            username: name,
            email: useremail,
            role: userrole,
            tags: arrayTags,
        }).then((response) => {
            console.log(response);
            setUserName(response.data.username);
            setEmail(response.data.email);
            setRole(response.data.role);
            let tagsObj = [];
            for (let i = 0; i < response.data.tags.length; i++) {
                const tag = { tagName: response.data.tags[i] };
                tagsObj.push(tag);
            }
            
            setUserTags(tagsObj);
        })
    }

    useEffect(() => {
        getProfileDetails().then((result1) => {
            //console.log(result1);
        })
        getTags().then((result) => {
            //console.log(result);
        });
    }, [])
    return (
        <div>
            <Container maxWidth="sm">
                {
                    <div className='profile-inputs'>
                        <Stack id="profile-stack" spacing={3} sx={{ width: 500, p: 5 }}>
                            <TextField
                                required
                                id="outlined-required"
                                label={local.username}
                                onChange={(e) => setUserName(e.target.value)}
                                value={username}
                            />

                            <TextField
                                disabled
                                id="outlined-required"
                                label={local.emailid}
                                
                                value={email}
                            />

                            <TextField
                                disabled
                                id="outlined-disabled"
                                label={local.role}
                                defaultValue={role}
                                value={role}
                            />

                            <Autocomplete
                                multiple
                                id="tags-standard"
                                options={tags}
                                getOptionLabel={(option) => option.tagName}
                                value={userTags}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="standard"
                                        label={local.userTags}
                                        placeholder="Tags"
                                    />
                                )}
                                onChange={(event, newValue, reason) => {
                                    if (reason === 'selectOption') {
                                        setUserTags([
                                            ...userTags, ...newValue.filter((option) => userTags.indexOf(option) === -1)
                                        ])
                                    } else if (reason === 'removeOption') {
                                        setUserTags([...newValue])
                                    }
                                }}
                                isOptionEqualToValue={(option, value) => option.tagName === value.tagName}
                            />

                            <Button variant="contained" onClick={() => updateProfile(username, email, role, userTags)}>{local.updateProfile}</Button>
                        </Stack>
                    </div>
                }
            </Container>
        </div>
    )
}

export default Profile;