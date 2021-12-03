exports.inviteUser = function (req, res) {
  var invitationBody = req.body
  var shopId = req.params.shopId
  var authUrl = 'https://url.to.auth.system.com/invitation'

  superagent
    .post(authUrl)
    .send(invitationBody)
    .end(function (err, invitationResponse) {
      if (invitationResponse.status === 201) {
        User.findOneAndUpdate(
          {
            authId: invitationResponse.body.authId,
          },
          {
            authId: invitationResponse.body.authId,
            email: invitationBody.email,
          },
          {
            upsert: true,
            new: true,
          },
          function (err, createdUser) {
            Shop.findById(shopId).exec(function (err, shop) {
              if (err || !shop) {
                return res.status(500).send(err || { message: 'No shop found' })
              }
              if (
                shop.invitations.indexOf(invitationResponse.body.invitationId)
              ) {
                shop.invitations.push(invitationResponse.body.invitationId)
              }
              if (shop.users.indexOf(createdUser._id) === -1) {
                shop.users.push(createdUser)
              }
              shop.save()
            })
          }
        )
      } else if (invitationResponse.status === 200) {
        res.status(400).json({
          error: true,
          message: 'User already invited to this shop',
        })
        return
      }
      res.json(invitationResponse)
    })
}

export function inviteUser(req, res, next) {
  const invitationBody = req.body
  const shopId = req.params.shopId
  const authUrl = 'https://url.to.auth.system.com/invitation'

  superagent
    .post(authUrl)
    .send(invitationBody)
    .end((error, invitationResponse) => {
      if (error) {
        return res.status(500).send(error)
      }
      if (invitationResponse.status === 200) {
        return res.status(400).json({
          error: true,
          message: 'User already invited to this shop',
        })
      }

      const { authId, invitationId } = invitationResponse.body

      if (invitationResponse.status === 201) {
        const create = createUser({ authId, email: invitationBody.email })
        const find = findShop(shopId)

        Promise.all([create, find])
          .then((response) => {
            const [createdUser, shop] = response

            if (!shop) {
              return res.status(500).send({ message: 'No shop found' })
            }
            if (shop.invitations.indexOf(invitationId)) {
              shop.invitations.push(invitationId)
            }
            if (shop.users.indexOf(createdUser._id) === -1) {
              shop.users.push(createdUser)
            }
            shop.save()
          })
          .catch((err) => res.status(500).json({ errorMessage: err.message }))
      }

      res.json(invitationResponse)
      next()
    })
}

function createUser({ authId, email }) {
  return User.findOneAndUpdate(
    { authId },
    { authId, email },
    { upsert: true, new: true }
  )
}
function findShop(shopId) {
  return Shop.findById(shopId)
}
