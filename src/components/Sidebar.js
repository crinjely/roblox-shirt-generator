import React, { Component } from 'react';
import ColorPicker from './ColorPicker';

class Sidebar extends Component {
    fileSelected = (ev) => {
        if(!ev.currentTarget.files.length)
            return;

        var reader = new FileReader();
    
        // read the image file as a data URL.
        let files = ev.currentTarget.files
        reader.readAsDataURL(files[0]);
        
        reader.onload = (e) => {
            this.props.onUploadImage(e.target.result, files)
        };
      }

    handleColorSelected = (color, event) => {
        this.props.onColorSelected(color)
    };


    handleClearColor = () => {
        this.props.onColorSelected(null)
    }

    handleTextChange = (ev) => {
        this.props.onTextChange(ev.currentTarget.value)
    };

    handleImageSizeChange = (ev) => {
        this.props.onImageSizeChange(ev.currentTarget.value)
    }

    componentDidUpdate() {
        const {data} = this.props;
        let uploader = document.getElementById('sidebarImageUploader')
            
        if(data && data.imageFileList) {
            uploader.files = data.imageFileList
        }
    }

    render() {
        const {data} = this.props;
        
        let contents = <div className="h-full">Click on a shirt area to edit</div>
        if(data) {
            contents = (                
                <div className="sidebar-main h-full"> 
                    <div className="sidebar-area">
                        <h3>Background Image</h3>
                        <div className="file-input">
                            <input type="file" id="sidebarImageUploader" onChange={this.fileSelected} />
                            <button>Upload Image</button> 
                        </div>
                        
                        {
                            data.imgUrl ? (
                                <select value={data.imageSize || 'width'} onChange={this.handleImageSizeChange}>
                                    <option value="width">Fit to width</option>
                                    <option value="height">Fit to height</option>
                                </select>
                            ) : null
                        }
                        
                    </div>

                    <div className="sidebar-area">
                        <h3>Background Color</h3>
                       <ColorPicker 
                        color={ data.backgroundColor || 'transparent' }
                        onChange={ this.handleColorSelected }
                       />
                       <button className="btn-tertiary" onClick={this.handleClearColor}>Clear</button>
                    </div>

                    <div className="sidebar-area">
                        <h3>Text</h3>
                        <input 
                            type="text" 
                            className="text-input"
                            value={data.text || ''} 
                            onChange={this.handleTextChange} 
                            placeholder="Enter text" 
                        />
                        {/* <input type="text" value={this.state.value} onChange={this.handleChange} /> */}
                    </div>
                </div>
                )
        }
        
        return (
            <div className="sidebar flex-col">
                
                <h3 className="headline">
                    {data ? `Editing ${data.name}` : 'Roblox Shirt Creator'}
                </h3>
                <div className="panel h-full flex-col">
                    {contents}
                    <div className="flex-end center">
                        <button className="btn-primary" onClick={this.props.downloadImage}>Finish & Download</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Sidebar;