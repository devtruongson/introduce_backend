```javascript
return await this.headerModel.aggregate([
    {
        $match: {
            is_active: true,
            'submenu.is_active': true,
        },
    },
    {
        $addFields: {
            submenu: {
                $filter: {
                    input: '$submenu',
                    as: 'item',
                    cond: { $eq: ['$$item.is_active', true] },
                },
            },
        },
    },
    {
        $sort: { position: 1 },
    },
]);
```

addFields: Thêm 1 trường https://www.mongodb.com/docs/manual/reference/operator/aggregation/addFields/

Giải Thích Cụ Thể
Đoạn mã bạn cung cấp sử dụng $addFields và $filter trong aggregation pipeline để lọc các mục trong mảng submenu. Đây là từng phần của mã và cách nó hoạt động:

1. $addFields
   Mục Đích: $addFields được sử dụng để thêm hoặc cập nhật các trường trong tài liệu kết quả của aggregation pipeline. Trong trường hợp này, nó dùng để cập nhật trường submenu trong tài liệu.
   Cú Pháp:
   javascript
   Copy code
   {
   $addFields: {
   <field>: <expression>
   }
   }
   Ở đây, <field> là tên trường bạn muốn thêm hoặc cập nhật, và <expression> là biểu thức tính toán giá trị của trường đó.
2. submenu
   Mục Đích: Trong trường hợp này, chúng ta cập nhật trường submenu của tài liệu.
   Cú Pháp:
   javascript
   Copy code
   submenu: {
   $filter: {
    input: '$submenu',
   as: 'item',
   cond: { $eq: ['$$item.is_active', true] }
   }
   }
   Ở đây, submenu được thiết lập lại với một giá trị mới được tính toán từ $filter.
3. $filter
   Mục Đích: $filter là toán tử trong MongoDB dùng để lọc các phần tử của một mảng dựa trên điều kiện cung cấp.

Cú Pháp:

javascript
Copy code
{
$filter: {
    input: <arrayField>,
    as: <variableName>,
    cond: <condition>
  }
}
input: Trường đầu vào mà bạn muốn lọc, ở đây là '$submenu' (trường submenu trong tài liệu).
as: Tên biến mà bạn muốn sử dụng để đại diện cho từng phần tử trong mảng trong biểu thức điều kiện. Ở đây, item là tên biến.
cond: Điều kiện lọc cho mỗi phần tử trong mảng. Đây là điều kiện mà các phần tử cần thỏa mãn để được đưa vào kết quả cuối cùng.
Cú Pháp Cụ Thể:

javascript
Copy code
submenu: {
$filter: {
    input: '$submenu', // Mảng cần lọc
as: 'item', // Tên biến đại diện cho mỗi phần tử trong mảng
cond: { $eq: ['$$item.is_active', true] } // Điều kiện lọc
  }
}
input: '$submenu': Đặt giá trị của trường submenu làm đầu vào cho $filter.
as: 'item': Đại diện cho từng phần tử trong mảng submenu bằng biến item.
cond: { $eq: ['$$item.is_active', true] }: Điều kiện để phần tử được giữ lại là item.is_active phải bằng true.
Tổng Kết
$addFields thêm hoặc cập nhật trường trong tài liệu kết quả.
$filter lọc các phần tử của mảng dựa trên điều kiện cho trước.
Trong trường hợp này, submenu chỉ chứa các mục mà có is_active là true, vì $filter lọc các mục không thỏa mãn điều kiện.
Ví Dụ Thực Tế
Giả sử bạn có tài liệu sau trong cơ sở dữ liệu:

json
Copy code
{
"\_id": "123",
"title": "Sample Header",
"submenu": [
{ "title": "Submenu 1", "is_active": false },
{ "title": "Submenu 2", "is_active": true },
{ "title": "Submenu 3", "is_active": false }
]
}
Sau khi áp dụng $addFields với $filter, kết quả sẽ là:

json
Copy code
{
"\_id": "123",
"title": "Sample Header",
"submenu": [
{ "title": "Submenu 2", "is_active": true }
]
}
Hy vọng giải thích trên đã giúp bạn hiểu rõ cách hoạt động của $addFields và $filter trong aggregation pipeline của MongoDB. Nếu bạn có thêm câu hỏi hoặc cần thêm trợ giúp, đừng ngần ngại yêu cầu!

Để hiểu rõ về $$item và cách hoạt động của nó trong $filter của MongoDB, hãy cùng phân tích kỹ lưỡng:

Các Thành Phần Của $filter
$filter: $filter là một toán tử trong MongoDB aggregation pipeline dùng để lọc các phần tử của một mảng theo điều kiện nhất định.

Cú pháp của $filter là:

javascript
Copy code
{
$filter: {
input: <arrayField>,
as: <variableName>,
cond: <condition>
}
}
input: Mảng đầu vào mà bạn muốn lọc.
as: Tên biến mà bạn muốn sử dụng để đại diện cho từng phần tử của mảng trong điều kiện lọc.
cond: Điều kiện lọc mà mỗi phần tử của mảng cần thỏa mãn để được giữ lại trong kết quả.

$$
item:

$$item là biến đại diện cho từng phần tử trong mảng input mà bạn định nghĩa trong as.
Dấu $$ trước tên biến (item trong trường hợp này) cho biết đây là một biến hệ thống, sử dụng trong biểu thức điều kiện.
Ví Dụ Cụ Thể
Giả sử bạn có một tài liệu như sau trong MongoDB:

json
Copy code
{
  "_id": "123",
  "title": "Sample Header",
  "submenu": [
    { "title": "Submenu 1", "is_active": false },
    { "title": "Submenu 2", "is_active": true },
    { "title": "Submenu 3", "is_active": false }
  ]
}
Bạn muốn lọc trường submenu để chỉ giữ lại các phần tử có is_active là true.

Aggregation Pipeline
javascript
Copy code
db.headers.aggregate([
  {
    $addFields: {
      submenu: {
        $filter: {
          input: '$submenu', // Mảng `submenu` đầu vào
          as: 'item', // Tên biến đại diện cho từng phần tử trong mảng
          cond: { $eq: ['$$item.is_active', true] } // Điều kiện lọc
        }
      }
    }
  }
])
input: '$submenu': Đặt giá trị của trường submenu trong tài liệu làm đầu vào cho $filter.
as: 'item': Tạo một biến tên là item đại diện cho mỗi phần tử trong mảng submenu.
cond: { $eq: ['$$item.is_active', true] }: Điều kiện để mỗi phần tử item được giữ lại là item.is_active phải bằng true.
Giải Thích Điều Kiện
$$item: Đây là cú pháp của MongoDB để tham chiếu đến phần tử hiện tại trong mảng khi dùng $filter.
$$item.is_active: Tham chiếu đến trường is_active của phần tử hiện tại (biến item) trong mảng submenu.
Kết Quả
Với tài liệu đầu vào trên, sau khi áp dụng aggregation pipeline, kết quả sẽ là:

json
Copy code
{
  "_id": "123",
  "title": "Sample Header",
  "submenu": [
    { "title": "Submenu 2", "is_active": true }
  ]
}
Tổng Kết
$$item là cách MongoDB tham chiếu đến mỗi phần tử của mảng trong ngữ cảnh của $filter.
Sử dụng $$ cho phép bạn truy cập vào các thuộc tính của phần tử hiện tại trong điều kiện lọc.
Hy vọng rằng giải thích này giúp bạn hiểu rõ hơn về cách sử dụng biến hệ thống trong MongoDB và cú pháp của $filter. Nếu bạn có thêm câu hỏi hoặc cần làm rõ thêm bất kỳ điểm nào, hãy cho tôi biết!
$$
