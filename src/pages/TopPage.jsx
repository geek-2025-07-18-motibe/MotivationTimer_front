import React from 'react';
import previewImage from '../assets/preview.png';
import { Clock, BarChart3, Quote, Target, TrendingUp, Timer } from "lucide-react";

const TopPage = () => {
 return (
   <>
     {/* ヒーローセクション */}
     <section className="container py-5 my-5">
       <div className="row align-items-center">
         <div className="col-lg-6">
           <h1 className="display-4 fw-bold mb-4">名言と共に学習を<br />可視化・習慣化</h1>
           <p className="lead text-muted mb-4">
             モチベタイマーは、勉強や作業の時間を記録し、名言があなたのモチベーションを支えるタイマーアプリです。日々の学習を可視化して、自己効力感を高めましょう。
           </p>
           <div className="row mb-5">
             <div className="col-md-6 mb-3">
               <p><Clock className="me-2 text-primary" size={20} /> 時間記録・蓄積</p>
               <p><Quote className="me-2 text-primary" size={20} /> 名言でモチベーション</p>
             </div>
             <div className="col-md-6 mb-3">
               <p><BarChart3 className="me-2 text-primary" size={20} /> 学習の可視化</p>
               <p><Target className="me-2 text-primary" size={20} /> 習慣化サポート</p>
             </div>
           </div>
         </div>
         <div className="col-lg-6">
           {/* アプリのプレビュー画像エリア */}
           <div
             className="bg-light rounded d-flex align-items-center justify-content-center"
             style={{ height: '400px', border: '1px solid #dee2e6' }}
           >
             <img src={previewImage} alt="アプリのプレビュー" className="img-fluid" style={{ maxHeight: '100%', maxWidth: '100%' }} />
           </div>
         </div>
       </div>
     </section>

     {/* 特徴セクション */}
     <section className="py-5 bg-light">
       <div className="container">
         <h2 className="text-center fw-bold mb-5">なぜモチベタイマーなのか？</h2>
         <div className="row text-center g-4">
           <div className="col-md-4">
             <div className="card border-0 shadow-sm h-100">
               <div className="card-body p-4">
                 <Timer className="fs-1 text-primary" />
                 <h3 className="h4 fw-bold my-3">シンプルなタイマー</h3>
                 <p className="text-muted">直感的で使いやすいタイマー機能で、集中して学習や作業に取り組めます。</p>
               </div>
             </div>
           </div>
           <div className="col-md-4">
             <div className="card border-0 shadow-sm h-100">
               <div className="card-body p-4">
                 <TrendingUp className="fs-1 text-primary" />
                 <h3 className="h4 fw-bold my-3">進捗の可視化</h3>
                 <p className="text-muted">学習時間を記録・蓄積し、あなたの成長を数値で確認できます。</p>
               </div>
             </div>
           </div>
           <div className="col-md-4">
             <div className="card border-0 shadow-sm h-100">
               <div className="card-body p-4">
                 <Quote className="fs-1 text-primary" />
                 <h3 className="h4 fw-bold my-3">名言でモチベーション</h3>
                 <p className="text-muted">厳選された名言があなたのやる気を支え、継続する力を与えます。</p>
               </div>
             </div>
           </div>
         </div>
       </div>
     </section>

     {/* フッターセクション */}
     <footer className="py-5 bg-dark text-white text-center">
       <div className="container">
         <p><Quote className="display-4" /></p>
         <h3 className="h4 my-4">”成功は日々の小さな努力の積み重ねである”</h3>
         <p className="text-white-50">モチベタイマーと共に、あなたの学習習慣を築き上げましょう</p>
       </div>
     </footer>
   </>
 );
};

export default TopPage;