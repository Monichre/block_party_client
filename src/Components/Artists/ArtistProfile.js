import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Container, Divider, Grid, Header, Menu, Message, Sidebar, Segment, Popup, Table, Button, Card, Image, Feed, List, Icon, Sticky, Rail } from 'semantic-ui-react'
import { Firebase, PhotoRef } from '../../Firebase'
import Axios from 'axios'
import ArtistUploads from './ArtistPartials/ArtistUploads'
import Dropzone from 'react-dropzone'


export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: true,
            songs: [],
            profile_photo: '',
            isOpen: false,
            activeItem: 'Uploads'
        }
    }
    componentWillMount() {
        this.getCurrentArtist()
    }
    getCurrentArtist() {
        const _this = this
        const artist_id = localStorage.getItem('artist_id') ? localStorage.getItem('artist_id') : this.props.match.params.id
        const ONBOARD_URL = process.env.NODE_ENV === 'development' ? `http://localhost:5000/artists/${artist_id}/onboard` : 'https://block-party-staging-server.herokuapp.com/' + `artists/${artist_id}/onboard`

        if (artist_id) {
            Axios.get(ONBOARD_URL).then((response) => {
                const { name, profile_photo, wallet_address } = response.data

                PhotoRef.child(profile_photo).getDownloadURL().then((url) => {
                    _this.setState({
                        name: name, 
                        profile_photo: url, 
                        wallet_address: wallet_address
    
                    })
                })
            }).catch((error) => {
                console.log(error)
            })
        }

    }
    onPhotoDrop(photo) {
        const _this = this
        const artist_id = localStorage.getItem('artist_id') ? localStorage.getItem('artist_id') : this.props.match.params.id
        const PROFILE_PHOTO_URL = process.env.NODE_ENV === 'development' ? `http://localhost:5000/artists/${artist_id}/edit/add-profile-photo` : 'https://block-party-staging-server.herokuapp.com/' + `artists/${artist_id}/edit/add-profile-photo`

        photo.forEach((file) => {
            let photo_url = URL.createObjectURL(file)
            let photoFileRef = PhotoRef.child(`/${file.name}`)
            
            photoFileRef.put(file).then((snapshot) => {
                Axios({
                    method: 'post',
                    url: PROFILE_PHOTO_URL,
                    data: {
                        profile_photo: file.name
                    }
                }).then(result =>
                    this.setState({
                        profile_photo: photo_url
                    })
                ).catch(error =>
                    console.log(error)
                )
            })
        })

    }
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
    handleOpen = () => this.setState({ isOpen: true })
    handleClose = () => this.setState({ isOpen: false })
    
    render() {

        const filler_image = <svg className="block_party_svg" id="a32edc05-b509-44f4-b17f-44366bd21933" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="742.91" height="774.18" viewBox="0 0 742.91 774.18"><defs><linearGradient id="cf395ef9-d49d-46ff-9db3-33e65ce37b27" x1="574" y1="811" x2="574" y2="77" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="gray" stop-opacity="0.25" /><stop offset="0.54" stop-color="gray" stop-opacity="0.12" /><stop offset="1" stop-color="gray" stop-opacity="0.1" /></linearGradient><clipPath id="2abbe605-d77a-4e1a-85e6-b6952e8de959" transform="translate(-223.59 -77)"><path id="df258b0c-f8dc-4734-bcc5-717165b733e8" data-name="&lt;Clipping Path&gt;" d="M645.91,527.12H626.14V431.74a16.4,16.4,0,0,0-16.35-16.35H536.21a16.4,16.4,0,0,0-16.35,16.35v95.38H500.09c-106.79,0-194.16,87.37-194.16,194.16v63.37A16.4,16.4,0,0,0,322.28,801H823.72a16.4,16.4,0,0,0,16.35-16.35V721.28C840.07,614.49,752.7,527.12,645.91,527.12Z" fill="#ffd9cb" /></clipPath></defs><title>man</title><path d="M649,529.45H630.63L631,444c60.34-18.63,105.11-72.74,121.57-134a12.21,12.21,0,0,0,4.66.93h10.35a12.37,12.37,0,0,0,12.34-12.34V239.22a12.37,12.37,0,0,0-12.34-12.34H757.23a12.25,12.25,0,0,0-1.63.12C739.28,141.57,664.19,77,574,77S408.72,141.57,392.4,227a12.25,12.25,0,0,0-1.63-.12H380.42a12.37,12.37,0,0,0-12.34,12.34v59.37a12.37,12.37,0,0,0,12.34,12.34h10.35a12.21,12.21,0,0,0,4.66-.93c16.46,61.26,61.6,115.36,121.94,134v85.45H499c-109.78,0-199.6,89.82-199.6,199.6v65.15A16.86,16.86,0,0,0,316.26,811H831.74a16.86,16.86,0,0,0,16.81-16.81V729C848.55,619.27,758.73,529.45,649,529.45Z" transform="translate(-223.59 -77)" fill="url(#cf395ef9-d49d-46ff-9db3-33e65ce37b27)" /><path d="M511.74,130.07c12-2.69,23.59,6.36,35.87,6.64,9.59.22,18.5-4.92,28-6.12s18.78,1.5,28.15,2.86,19.82,1.07,27.1-5" transform="translate(-223.59 -77)" fill="#bf655b" opacity="0.2" /><path d="M511.74,146.42c12-2.69,23.59,6.36,35.87,6.64,9.59.22,18.5-4.92,28-6.12s18.78,1.5,28.15,2.86,19.82,1.07,27.1-5" transform="translate(-223.59 -77)" fill="#bf655b" opacity="0.2" /><circle id="319da30a-b754-4c25-967a-210e088b184d" data-name="&lt;Ellipse&gt;" cx="349.41" cy="189.86" r="179.86" fill="#ffd9cb" /><path d="M598.89,326.82c0,6.77-11.59,12.26-25.89,12.26s-25.89-5.49-25.89-12.26S558.7,314.55,573,314.55,598.89,320,598.89,326.82Z" transform="translate(-223.59 -77)" fill="#fff" /><circle cx="275.83" cy="154.44" r="17.71" fill="#383f4d" /><circle cx="422.99" cy="154.44" r="17.71" fill="#383f4d" /><circle cx="281.28" cy="148.98" r="5.45" fill="#fff" /><circle cx="428.44" cy="148.98" r="5.45" fill="#fff" /><path d="M679.28,193.28h-64a16.4,16.4,0,0,0-16.35,16.35v43.6a16.4,16.4,0,0,0,16.35,16.35h64a16.4,16.4,0,0,0,16.35-16.35v-43.6A16.4,16.4,0,0,0,679.28,193.28ZM682,242.34a16.4,16.4,0,0,1-16.35,16.35H628.87a16.4,16.4,0,0,1-16.35-16.35v-21.8a16.4,16.4,0,0,1,16.35-16.35h36.79A16.4,16.4,0,0,1,682,220.53Z" transform="translate(-223.59 -77)" fill="#69f0ae" /><path d="M450.37,209.63v43.6a16.4,16.4,0,0,0,16.35,16.35h64a16.4,16.4,0,0,0,16.35-16.35v-43.6a16.4,16.4,0,0,0-16.35-16.35h-64A16.4,16.4,0,0,0,450.37,209.63ZM464,220.53a16.4,16.4,0,0,1,16.35-16.35h36.79a16.4,16.4,0,0,1,16.35,16.35v21.8a16.4,16.4,0,0,1-16.35,16.35H480.34A16.4,16.4,0,0,1,464,242.34Z" transform="translate(-223.59 -77)" fill="#69f0ae" /><path d="M596.31,236.92a41.48,41.48,0,0,0-45.26,0c-3.78,2.42-8.93,2.93-12,.11l-3.85-3.85c-3-2.78-1.31-9.51,4.65-13.39a62,62,0,0,1,67.59,0c6,3.88,7.68,10.62,4.65,13.39L608.28,237C605.25,239.84,600.1,239.34,596.31,236.92Z" transform="translate(-223.59 -77)" fill="#69f0ae" /><path d="M554.91,399.44c1.36-5.54,7.84-8,13.5-8.76,8.4-1.17,18.36,0,23,7.13" transform="translate(-223.59 -77)" fill="#bf655b" opacity="0.2" /><rect x="515.64" y="155.8" width="34.06" height="81.76" rx="12" ry="12" fill="#ffd9cb" /><rect x="372.7" y="232.8" width="34.06" height="81.76" rx="12" ry="12" transform="translate(555.87 470.35) rotate(-180)" fill="#ffd9cb" /><path id="d0792c33-9ec1-4841-835c-a536abc3f381" data-name="&lt;Clipping Path&gt;" d="M645.91,527.12H626.14V431.74a16.4,16.4,0,0,0-16.35-16.35H536.21a16.4,16.4,0,0,0-16.35,16.35v95.38H500.09c-106.79,0-194.16,87.37-194.16,194.16v63.37A16.4,16.4,0,0,0,322.28,801H823.72a16.4,16.4,0,0,0,16.35-16.35V721.28C840.07,614.49,752.7,527.12,645.91,527.12Z" transform="translate(-223.59 -77)" fill="#ffd9cb" /><g clip-path="url(#2abbe605-d77a-4e1a-85e6-b6952e8de959)"><path d="M528,533.9c27.21,7.92,57.11,15.72,83.09,4.39,19.23-8.39,33.18-26.17,52.44-34.48,24.27-10.47,52.27-4.15,77.4,4a583.86,583.86,0,0,1,156.64,78.59c16.11,11.4,31.92,23.91,43,40.27,9.75,14.43,15.38,31.26,19.42,48.21,6.56,27.51,9.19,56.48,2.94,84.07s-22.13,53.74-46.35,68.34c-21.86,13.18-48.2,16-73.59,18.59-22.56,2.27-45.14,4.54-67.81,5.14-83.71,2.21-166.53-18.36-250.26-19.5-80.52-1.09-164.11,15.39-239.72-12.33-18.19-6.67-36.15-16.4-47.19-32.32-13.53-19.52-14.49-44.85-14.43-68.6,0-12.34.23-24.85,3.57-36.72,3.62-12.86,10.77-24.43,18.48-35.35,50.82-71.94,135-127.21,223.17-138.81C492,504.32,505.08,527.21,528,533.9Z" transform="translate(-223.59 -77)" fill="#6c63ff" /></g></svg>
        const { activeItem, visible } = this.state

        const profile_card = (
            <Card className="profile-card"
                image={this.state.profile_photo ? this.state.profile_photo : filler_image}
                header={this.state.name}
                extra={'Wallet Address: ' + this.state.wallet_address}
            />
        )
        const AddProfilePhotoPopUp = () => (
            <Popup
                trigger={profile_card}
                className='profile-popup'
                on='click'
                open={this.state.isOpen}
                onClose={this.handleClose}
                onOpen={this.handleOpen}
                position='top left'>

                <Popup.Content>
                    <Card.Content>
                        <h3>Upload a profile photo</h3>
                        <Dropzone onDrop={this.onPhotoDrop.bind(this)}></Dropzone>
                    </Card.Content>
                </Popup.Content>
            </Popup>
        )
        const menuItemStyle = {
            background: '#f1f2f4'
        }

        const setActiveSection = (activeSection) => {
            if (activeSection === 'Uploads') {
                return <ArtistUploads />
            } else if (activeSection === 'bio') {
                return <div>bio</div>
            } else if (activeSection === 'vids') {
                return <div>vids</div>
            } else if (activeSection === 'links') {
                return <div>links</div>
            } else if (activeSection === 'songs') {
                return <div>songs</div>
            } else if (activeSection === 'merch') {
                return <div>merch</div>
            }
        }
        const section = setActiveSection(activeItem)

        return (
            <div id='Dashboard' ref={this.handleContextRef}>
                <Sidebar.Pushable as={Segment}>
                    <Sidebar as={Menu} animation='push' width='wide' visible={visible} icon='labeled' vertical inverted id='SideBarDashboard'>
                        <Menu.Item name='home'>
                            <AddProfilePhotoPopUp />
                            <Feed>
                                {this.state.songs.map((song) => (
                                    <Feed.Event>
                                        <Feed.Label>
                                            <Icon name='music' />
                                        </Feed.Label>
                                        <Feed.Content>
                                            <Feed.Summary>
                                                <Feed.User>{song.name}</Feed.User> has been uploaded
                                        <Feed.Date>1 Hour Ago</Feed.Date>
                                            </Feed.Summary>
                                        </Feed.Content>
                                    </Feed.Event>
                                ))}
                            </Feed>
                        </Menu.Item>
                        <Menu.Item name='Home'>
                            <Icon name='home' />
                            <Link to='/'>Home</Link>
                        </Menu.Item>
                        <Menu.Item name='Browse'>
                            <Icon name='search' />
                            <Link to='/browse'>Browse</Link>
                        </Menu.Item>
                        <Menu.Item name='Log Out'>
                            <Icon name='sign out' />
                            <Link to='/logout'>Log Out</Link>
                        </Menu.Item>
                    </Sidebar>
                    <Sidebar.Pusher >
                        <div className="wrap" style={{paddingTop: '100px'}}>
                            <Grid>
                                <Grid.Column stretched width={12} className='artist-inner-dashboard'>
                                    {section}
                                </Grid.Column>

                                <Grid.Column width={4} className="artist-menu__column">
                                    <Menu fluid vertical tabular='right' className="artist-menu">
                                        <Menu.Item style={activeItem === 'Uploads' ? null : menuItemStyle} name='Uploads' active={activeItem === 'Uploads'} onClick={this.handleItemClick} secondary/>
                                        <Menu.Item style={activeItem === 'bio' ? null : menuItemStyle} name='bio' active={activeItem === 'bio'} onClick={this.handleItemClick} />
                                        <Menu.Item style={activeItem === 'vids' ? null : menuItemStyle} name='vids' active={activeItem === 'vids'} onClick={this.handleItemClick} />
                                        <Menu.Item style={activeItem === 'links' ? null : menuItemStyle} name='links' active={activeItem === 'links'} onClick={this.handleItemClick} />
                                        <Menu.Item style={activeItem === 'songs' ? null : menuItemStyle} name='songs' active={activeItem === 'songs'} onClick={this.handleItemClick} />
                                        <Menu.Item style={activeItem === 'merch' ? null : menuItemStyle} name='merch' active={activeItem === 'merch'} onClick={this.handleItemClick} />
                                    </Menu>
                                </Grid.Column>
                            </Grid>
                        </div>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>

        )
    }
}