<template>
  <div class="headhead">
    <div class="head_img">a</div>
  </div>

  <div class="main_box">
    <div class="main">
      <!--左側　新着物件-->
      <div class="left-column">
        <p class="searchform_head">駅名・エリア名で一発検索</p>
        <form method="get" action="#" class="search_container">
          <input
            type="text"
            class="searchform_text-form"
            size="30"
            placeholder="お探しの駅またはエリア名を入力"
          />
          <input type="submit" value="検索" />
        </form>

        <div class="searchform_border">
          <p class="searchform_txt">絞り込み条件</p>
        </div>
        <form class="search_line">
          <label><input type="radio" name="line" />山手線</label>
          <label><input type="radio" name="line" />中央線</label>
        </form>

        <div class="searchform_border">
          <p class="searchform_txt">賃料</p>
        </div>
        <div class="rent">
          <select name="rent_low">
            <option value="low">下限なし</option>
            <option value="aa">1000万円~</option>
            <option value="bb">2000万円~</option>
            <option value="cc">3000万円~</option>
            <option value="dd">4000万円~</option>
          </select>
          <select name="Rent_hight">
            <option value="hight">上限なし</option>
            <option value="ee">~1000万円</option>
            <option value="ff">~2000万円</option>
            <option value="gg">~3000万円</option>
            <option value="hh">~4000万円</option>
          </select>
        </div>

        <div class="searchform_border">
          <p class="searchform_txt">間取りタイプ</p>
        </div>
        <div class="searchform_floor">
          <label><input type="radio" name="floor" />1R</label>
          <label><input type="radio" name="floor" />1K</label>
          <label><input type="radio" name="floor" />1DK</label>
          <label><input type="radio" name="floor" />1LDK</label><br />
          <label><input type="radio" name="floor" />2K</label>
          <label><input type="radio" name="floor" />2DK</label>
          <label><input type="radio" name="floor" />2LDK</label><br />
          <label><input type="radio" name="floor" />3K</label>
          <label><input type="radio" name="floor" />3DK</label>
          <label><input type="radio" name="floor" />3LDK</label><br />
          <label><input type="radio" name="floor" />4K</label>
          <label><input type="radio" name="floor" />4DK</label>
          <label><input type="radio" name="floor" />4LDK</label><br />
          <label><input type="radio" name="floor" />5K以上</label>
        </div>

        <div class="searchform_border">
          <p class="searchform_txt">建物の種類</p>
        </div>
        <div class="searchform_floor">
          <label><input type="radio" name="floor" />マンション</label>
          <label><input type="radio" name="floor" />アパート</label>
          <label><input type="radio" name="floor" />一戸建て</label>
        </div>

        <div class="searchform_border">
          <p class="searchform_txt">部屋階数</p>
        </div>
        <div class="searchform_floor">
          <label><input type="radio" name="floor" />1階</label>
          <label><input type="radio" name="floor" />2階</label>
          <label><input type="radio" name="floor" />3階</label>
          <label><input type="radio" name="floor" />それ以上</label>
        </div>

        <div class="searchform_border">
          <p class="searchform_txt">構造</p>
        </div>
        <div class="searchform_floor">
          <label><input type="radio" name="floor" />木造</label>
          <label><input type="radio" name="floor" />鉄筋</label>
          <label><input type="radio" name="floor" />鉄骨</label><br />
          <label><input type="radio" name="floor" />ブロック・それ以外</label>
        </div>

        <div class="searchform_border">
          <p class="searchform_txt">築年数</p>
        </div>
        <div class="rent">
          <select name="rent_low">
            <option value="zero">指定しない</option>
            <option value="ii">1年以内</option>
            <option value="jj">3年以内</option>
            <option value="kk">5年以内</option>
            <option value="ll">7年以内</option>
            <option value="nn">10年以内</option>
            <option value="mm">15年以内</option>
            <option value="oo">20年以内</option>
            <option value="pp">25年以内</option>
          </select>
        </div>

        <div class="searchform_border">
          <p class="searchform_txt">駅徒歩</p>
        </div>
        <div class="rent">
          <select name="rent_low">
            <option value="zeroo">指定しない</option>
            <option value="qq">5分以内</option>
            <option value="rr">10分以内</option>
            <option value="ss">15分以内</option>
            <option value="tt">15分以上</option>
          </select>
        </div>

        <div class="searchform_submit">
          <section>
            <a href="#" class="btn_06"><span>BUTTON</span></a>
          </section>
        </div>
      </div>

      <!--右側　新着物件-->
      <div class="right-column">
        <!-- <div class="object">
      <section class="object-card">
          <img class="object-card-img" src="https://placehold.jp/300x200.png" alt="">
              <div class="object-card-content">
                  <h1 class="object-card-title">Webクリエイターボックス</h1>
                  <p class="object-card-text">WebデザインやWebサイト制作、最新のWeb業界情報などを紹介していくサイト。</p>
              </div>
      </section>
      <section class="object-card">
          <img class="object-card-img" src="https://placehold.jp/300x200.png" alt="">
              <div class="object-card-content">
                  <h1 class="object-card-title">Webクリエイターボックス</h1>
                  <p class="object-card-text">WebデザインやWebサイト制作、最新のWeb業界情報などを紹介していくサイト。</p>
              </div>
      </section>
      <section class="object-card">
          <img class="object-card-img" src="https://placehold.jp/300x200.png" alt="">
              <div class="object-card-content">
                  <h1 class="object-card-title">Webクリエイターボックス</h1>
                  <p class="object-card-text">WebデザインやWebサイト制作、最新のWeb業界情報などを紹介していくサイト。</p>
              </div>
      </section>
    </div> -->

        <div class="wrap">
          <div class="card">
            <img src="images/house.png" alt="" />

            <div class="card__textbox">
              <div class="card__titletext">東京都新宿区</div>
              <div class="card__titletext_price">1200万円</div>
              <div class="card__overviewtext">
                JR山手線<br />JR中央・青海線快速
              </div>
              <div class="card__overviewtext">徒歩9分 / 38㎡ / 1LDK</div>
            </div>
          </div>

          <div class="card">
            <div class="card__imgframe"></div>
            <div class="card__textbox">
              <div class="card__titletext">
                タイトルがはいります。タイトルがはいります。
              </div>
              <div class="card__overviewtext">
                概要がはいります。概要がはいります。概要がはいります。概要がはいります。
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card__imgframe"></div>
            <div class="card__textbox">
              <div class="card__titletext">
                タイトルがはいります。タイトルがはいります。
              </div>
              <div class="card__overviewtext">
                概要がはいります。概要がはいります。概要がはいります。概要がはいります。
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card__imgframe"></div>
            <div class="card__textbox">
              <div class="card__titletext">
                タイトルがはいります。タイトルがはいります。
              </div>
              <div class="card__overviewtext">
                概要がはいります。概要がはいります。概要がはいります。概要がはいります。
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card__imgframe"></div>
            <div class="card__textbox">
              <div class="card__titletext">
                タイトルがはいります。タイトルがはいります。
              </div>
              <div class="card__overviewtext">
                概要がはいります。概要がはいります。概要がはいります。概要がはいります。
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card__imgframe"></div>
            <div class="card__textbox">
              <div class="card__titletext">
                タイトルがはいります。タイトルがはいります。
              </div>
              <div class="card__overviewtext">
                概要がはいります。概要がはいります。概要がはいります。概要がはいります。
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card__imgframe"></div>
            <div class="card__textbox">
              <div class="card__titletext">
                タイトルがはいります。タイトルがはいります。
              </div>
              <div class="card__overviewtext">
                概要がはいります。概要がはいります。概要がはいります。概要がはいります。
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card__imgframe"></div>
            <div class="card__textbox">
              <div class="card__titletext">
                タイトルがはいります。タイトルがはいります。
              </div>
              <div class="card__overviewtext">
                概要がはいります。概要がはいります。概要がはいります。概要がはいります。
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card__imgframe"></div>
            <div class="card__textbox">
              <div class="card__titletext">
                タイトルがはいります。タイトルがはいります。
              </div>
              <div class="card__overviewtext">
                概要がはいります。概要がはいります。概要がはいります。概要がはいります。
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="intro_section">
    <h1>TROUBLE HOUSE会員ができること</h1>

    <div class="intro_section_box">
      <div class="intro_section_minibox">
        <div class="border-radius">
          <img src="images/パソコンする女の子.png" alt="お気に入り" />
        </div>
        <p>新着物件をメールでお届け</p>
      </div>
      <!-- <p>新着物件をメールでお届け</p> -->

      <div class="intro_section_minibox">
        <div class="border-radius">
          <img src="images/お気に入りする女の子.png" alt="お気に入り" />
        </div>
        <p>お気に入り登録ができる</p>
      </div>
      <!-- <p>お気に入り登録ができる</p> -->

      <div class="intro_section_minibox">
        <div class="border-radius">
          <img src="images/ゲームする女の子.png" alt="お気に入り" />
        </div>
        <p>ゲームでポイントが貯めれる</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Top",
  // setup(props, context) {
  //   const data = reactive({
  //     title: "HelloWorld",
  //     msg: "This is HelloWorld component.",
  //   });
  //   return {
  //     data,
  //   };
  // },
};
</script>
