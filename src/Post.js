import React from 'react';
import "./style.css";
import { db } from "./firebase";
import ClearIcon from "@material-ui/icons/Clear";

//削除ボタン
// データが上から渡ってきますよ　=props データを指定するのが下
// const Post = (props) => {
const Post = ({id, name, text, image, timestamp}) => {
    const DeleteInputData = () => {
        db.collection("posts").doc(id).delete();
        console.log('削除が実行されました！', id);
    };




    return (
        <div className="postdata">
        {/*v記述１。テキスト情報が渡ってくる */}
        {/* <div>{props.text}</div>のpropsはいらない */}
        <div className="name">{name}</div>
        <div className="text">{text}</div>
            {/*記述２　画像を表示　imgタグ */}
            {/* 記述4　画像があるときだけ表示　props image && */}

    {image ? (
        <div>
          <img src={image} alt="" width="180px" height="auto" />
        </div>
      ) : (
        <h1>画像なし</h1>
      )}
    {/*記述３.日付を表示 */}
        <div>{new Date(timestamp?.toDate()).toLocaleString()}</div>
    {/* 削除の実行 */}
        {/* <button onClick={() => DeleteInputData(id)}>削除</button> */}
        {/* <button onClick={DeleteInputData}> */}
        <button onClick={() => DeleteInputData(id)}>
        <ClearIcon />
        </button>
    
    {/* 以下イメージの表示方法参考 */}
    {/* {image &&(
        <div>
        <img src={image} alt="" width="150px" />
        </div>
    )} */}
{/*  ないときに別のものを表示 ?の次はtrueしかない　:のあとはNO（：はでなければ */}
    {/* {image ? (
        <div>
          <img src={image} alt="" />
        </div>
      ) : (
        <h1>画像がない時にはh1が表示される</h1>
      )} */}
{/* 
            <div>
                <img src={image} alt=""/>
            </div> */}

         {/* 削除の実行 */}
         {/* <button onClick={DeleteInputData}>
        <ClearIcon />
      </button> */}


        </div>
    );
};

export default Post;


// json のデータをJSからは文字列で、文字列のデータをJSのデータの塊に
// 以下に安全なデータなのか 
// 