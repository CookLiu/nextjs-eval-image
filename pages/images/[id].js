import Layout from "../../components/layout";
import { getAllImageIds, getImageData } from '../../lib/posts'
import { SimpleForm } from '../../components/form'


export async function getStaticProps({ params }) {
  const imageResult = await getImageData(params.id)
  let next_id = imageResult.next_id
  let next_path = `/images/${next_id}`
  const content = imageResult.content

  if (next_id === undefined) {
    next_id = ''
    next_path = '/'
  }
  const postData = {
    id: params.id,
    path: `/images/${params.id}.jpg`,
    content: content,
    nextId: next_id,
    nextPath: next_path
  }
  return {
    props: {
      postData
    }
  }
}

export async function getStaticPaths() {
  const paths = getAllImageIds()
  return {
    paths,
    fallback: false
  }
}

export default function Post({ postData }) {
  // Handle the submit event on form submit.
  const handleSubmit = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault()
 console.log(111);
    // Get data from the form.
    console.log(event.target.vin_check_yes)
    const data = {
      vin_check_yes: event.target.vin_check_yes.checked,
      vin_check_no: event.target.vin_check_no.checked,
      vin_ocr_yes: event.target.vin_ocr_yes.checked,
      vin_ocr_no: event.target.vin_ocr_no.checked,
      is_car_vin: event.target.is_car_vin.checked,
      notes: event.target.notes.value,
      picName: event.target.picName.value,
      check_wrong_reason: event.target.check_wrong_reason.value,
    }

    const JSONdata = JSON.stringify(data)

    // Send the form data to our API and get a response.
    const response = await fetch('/api/form', {
      // Body of the request is the JSON data we created above.
      body: JSONdata,

      // Tell the server we're sending JSON.
      headers: {
        'Content-Type': 'application/json',
      },
      // The method is POST because we are sending data.
      method: 'POST',
    })

    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const result = await response.json()

    location.href = `${postData.nextPath}`
  }
  

  return (
    <Layout>
      <p>请仔细评估以下图片识别的准确率，包括不限于：画框的准确率、VIN码识别的准确率、图片的类型等</p>
    
      <div>
      <img
        src={postData.path}
        alt={postData.id} />
      </div>
      <br></br>
      <details open style={{borderTop: '1px solid red', paddingTop: '20px'}}>
        <div
          dangerouslySetInnerHTML={{ __html: postData.content }}
        />
      </details>
      {/* 分割线 */}
      {/* <Divider mt='10px' /> */}
      <form onSubmit={handleSubmit} style={{borderTop: '1px solid red', paddingTop: '20px'}}>
        <div>
          <input id="picName" name="picName" component="textarea" defaultValue={postData.id}/>
        </div>        
        <br></br>
        <div>
          <label htmlFor="vin_check" style={{color: 'red',fontWeight: 'bold'}}>VIN码画框是否成功:</label>
          <div id="vin_check">
            <label htmlFor="vin_check_yes">Yes</label>
            <input type="checkbox" id="vin_check_yes" name="vin_check_yes" />
            <label htmlFor="vin_check_no">No</label>
            <input type="checkbox" id="vin_check_no" name="vin_check_no" />
          </div>
        </div>
        <div>
          <br></br>
        <label htmlFor="check_wrong_reason" style={{color: 'red',fontWeight: 'bold'}}>文本框错误情况分类：</label>
          <select name="check_wrong_reason" id="reason_seletor">
            <option value="文本框识别正确">文本框识别正确</option>
            <option value="部分文本框检测丢失">部分文本框检测丢失</option>
            <option value="文本框未丢失，但是较小，导致后面识别数据不全">文本框未丢失，但是较小，导致后面识别数据不全</option>
            <option value="一个文本框被分割成不合理的多个（小）框">一个文本框被分割成不合理的多个（小）框</option>
            <option value="有文本，但是无任何文本识别框">有文本，但是无任何文本识别框</option>
            <option value="图像本身无文本">图像本身无文本</option>
          </select>
        </div>
        <br></br>
        <br></br>
        <div>
          <label htmlFor="vin_ocr" style={{color: 'red',fontWeight: 'bold'}}>VIN码OCR是否成功:</label>
          <div id="vin_ocr">
            <label htmlFor="vin_ocr_yes">Yes</label>
            <input type="checkbox" id="vin_ocr_yes" name="vin_ocr_yes" />
            <label htmlFor="vin_ocr_no">No</label>
            <input type="checkbox" id="vin_ocr_no" name="vin_ocr_no" />
          </div>
        </div>
        <br></br>
        <div>
          <label htmlFor="is_car_vin" style={{color: 'red',fontWeight: 'bold'}}>是否接车场景：车窗下VIN照片</label>
          <div>
            <label htmlFor="is_car_vin">Yes</label>
            <input type="checkbox" id="is_car_vin" name="is_car_vin"  />
          </div>
        </div>
        <br></br>
        <div>
          <label style={{color: 'red',fontWeight: 'bold'}}>备注</label>
          <div>
            <input id="notes" name="notes" component="textarea" />
          </div>
        </div>
        <br></br>
        <div>
          <button type="submit">
            提交
          </button>
        </div>
      </form>

    </Layout>
  )
}
  